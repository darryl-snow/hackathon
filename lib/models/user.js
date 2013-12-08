var Schema, UserSchema, authTypes, crypto, mongoose, validatePresenceOf;

mongoose = require("mongoose");
Schema = mongoose.Schema;
crypto = require("crypto");

authTypes = ["twitter", "facebook"];

UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  provider: String,
  score: Number,
  hashed_password: String,
  salt: String,
  facebook: {},
  twitter: {}
});

UserSchema.virtual("password").set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  return this.hashed_password = this.encryptPassword(password);
}).get(function() {
  return this._password;
});

validatePresenceOf = function(value) {
  return value && value.length;
};

UserSchema.path("name").validate((function(name) {
  if (authTypes.indexOf(this.provider) !== -1) {
    return true;
  }
  return name.length;
}), "Name cannot be blank");

UserSchema.path("email").validate((function(email) {
  if (authTypes.indexOf(this.provider) !== -1) {
    return true;
  }
  return email.length;
}), "Email cannot be blank");

UserSchema.path("email").validate((function(email, fn) {
  var UserModel;
  if (authTypes.indexOf(this.provider) !== -1) {
    return fn(true);
  }
  UserModel = mongoose.model("User");
  return UserModel.find({
    email: email.toLowerCase(),
    provider: this.provider
  }, function(err, emails) {
    return fn(err || emails.length === 0);
  });
}), "Email is already registered");

UserSchema.path("username").validate((function(username) {
  if (authTypes.indexOf(this.provider) !== -1) {
    return true;
  }
  return username.length;
}), "Username cannot be blank");

UserSchema.path("hashed_password").validate((function(hashed_password) {
  if (authTypes.indexOf(this.provider) !== -1) {
    return true;
  }
  console.log(hashed_password);
  return hashed_password.length;
}), "Password cannot be blank");

UserSchema.pre("save", function(next) {
  if (!this.isNew) {
    return next();
  }
  if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
    return next(new Error("Invalid password"));
  } else {
    return next();
  }
});

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
  encryptPassword: function(password) {
    if (!password) {
      return "";
    }
    return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
  }
};

mongoose.model('User', UserSchema);