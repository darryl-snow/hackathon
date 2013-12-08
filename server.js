'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    flash = require('connect-flash');

var app = express();
app.use(flash());

// Connect to database
var db = require('./lib/db/mongo');

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Populate empty DB with dummy data
require('./lib/db/dummydata');


// Express Configuration
app.configure('development', function(){
  app.use(require('connect-livereload')());
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
  app.set('views', __dirname + '/app/views');
});

app.configure('production', function(){
  app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', __dirname + '/views');
});

app.configure(function(){
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());

  // Router needs to be last
	app.use(app.router);
});

// Controllers
var api = require('./lib/controllers/api'),
    controllers = require('./lib/controllers');

// Server Routes
app.get('/api/today', api.today); // get today's question
app.get('/api/questions/:questionid', api.question); // get specific question
app.get('/api/questions/', api.questions); // get all questions
app.post('/api/questions/', api.newquestion); // create new question

app.get('/api/answers/:questionid', api.answers); // get answers for specific question
app.post('/api/answers', api.answer); // post new answer
app.put('/api/answers/:answerid', api.vote); // vote

app.get('/api/nouns', api.nouns); // get 2 random nouns

app.param('questionid', api.questionid);
app.param('answerid', api.answerid);

// Angular Routes
app.get('/partials/*', controllers.partials);
app.get('/', controllers.index);

// app.post("/users/session", passport.authenticate("local", {
//   failureRedirect: "/api/signin",
//   failureFlash: "Invalid email or password."
// }), api.session);

// app.get("/auth/facebook", passport.authenticate("facebook", {
//   scope: ["email", "user_about_me"],
//   failureRedirect: "/api/signin"
// }), api.signin);

// app.get("/auth/facebook/callback", passport.authenticate("facebook", {
//   failureRedirect: "/api/signin"
// }), api.authCallback);

// app.get("/auth/twitter", passport.authenticate("twitter", {
//   failureRedirect: "/api/signin"
// }), api.signin);

// app.get("/auth/twitter/callback", passport.authenticate("twitter", {
//   failureRedirect: "/api/signin"
// }), api.authCallback);

app.get('/api/signin', api.signin);
app.get('/api/signup', api.signup);
app.get('/api/signout', api.signout);
app.post('/api/users', api.newuser);
app.get('/api/users/me', api.me);
app.get('/api/users', api.users);


// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
