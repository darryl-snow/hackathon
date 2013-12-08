'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var NounSchema = new Schema({
  noun: String
});

// Validations
NounSchema.path('noun').validate(function (str) {
  return str !== '';
}, 'Empty string');

NounSchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

mongoose.model('Noun', NounSchema);
