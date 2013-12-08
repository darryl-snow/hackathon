'use strict';

var mongoose = require('mongoose'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer'),
    Noun = mongoose.model('Noun'),
    User = mongoose.model('User');

// Questions

exports.today = function(req, res) {
  var today = new Date();
  today.setHours(0,0,0,0);
  Question.find({private: false, date: today}).exec(function (err, question) {
    if(err) {
      return res.render('error',{status: 500});
    }
    if(!question) {
      return res.send(new Error('Failed to load Question ' + new Date()));
    }
    req.question = question;
    return res.jsonp(question);
  });
};

exports.question = function(req, res) {
  // return specific question
  var question = req.question;
  return res.jsonp(question);
};

exports.questionid = function(req, res, next, id) {

  Question.findOne({_id: id}).exec(function (err, question) {
    if(err) {
      return next(err);
    }
    if(!question) {
      return next(new Error('Failed to load Question ' + id));
    }
    req.question = question;
    return next();
  });
};

exports.questions = function(req, res) {
  // return all questions
  Question.find().sort('-created').populate('question').exec(function (err, questions) {
    if(err) {
      return res.render('error',{status: 500});
    } else {
      return res.jsonp(questions);
    }
  });
};

exports.newquestion = function(req, res) {
  var question = new Question(req.body);
  question.save(function (err) {
    if(err) {
      return res.render('error',{status: 500});
    } else {
      return res.jsonp(question);
    }
  });
};

// Answers

exports.answers = function(req, res) {
  // return all answers for specific question
  var question = req.question._id;
  Answer.find({question: question}).sort('-created').populate('answer').exec(function (err, answers) {
    if(err) {
      res.render('error', {status: 500});
    } else {
      res.jsonp(answers);
    }
  });
};

exports.answer = function(req, res) {

  // submit answer
  var answer = new Answer(req.body);
  answer.save(function (err) {
    if(err) {
      return res.render('/',{
        errors: err.errors,
        text: answer.text
      });
    } else {
      return res.jsonp(answer);
    }
  });
};

exports.vote = function(req, res) {
  // submit vote
  
  var answer = req.answer;
  answer.votes += 1;
  answer.save(function(err){
    if(err) {
      return res.render('/', {
        errors: err.errors,
        text: answer.text
      });
    } else {
      return res.jsonp(answer);
    }
  });
};

exports.answerid = function(req, res, next, id) {
  Answer.findOne({_id: id}).exec(function (err, answer) {
    if(err) {
      return next(err);
    }
    if(!answer) {
      return next(new Error('Failed to load Answer ' + id));
    }
    req.answer = answer;
    return next();
  });
};

exports.nouns = function(req, res) {
  // return a random noun
  Noun.random(function(err, noun) {
    Noun.random(function(err, noun2) {
      res.send([
        noun.noun
      ,
        noun2.noun
      ])
    });
  });
};

// Users

exports.newuser = function(req, res) {
  var user;
  user = new User(req.body);
  user.provider = 'local';
  return user.save(function(err) {
    if (err) {
      return res.render('/signup', {
        errors: err.errors,
        user: user
      });
    }
    return req.logIn(user, function(err) {
      if (err) {
        res.render('error', {status: 500});
      }
      return res.redirect('/');
    });
  });
};

exports.me = function(req, res) {
  return res.jsonp(req.user);
};

exports.users = function(req, res) {
  return User.find().sort('score').populate('user').exec(function(err, users) {
    if (err) {
      return res.render('error', {
        status: 500
      });
    } else {
      return res.jsonp(users);
    }
  });
};

exports.authCallback = function(req, res, next) {
  return res.redirect('/');
};

exports.signin = function(req, res) {
  return res.render('signin', {
    title: 'Signin',
    message: req.flash('error')
  });
};

exports.signup = function(req, res) {
  return res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

exports.signout = function(req, res) {
  req.logout();
  return res.redirect('/');
};

exports.session = function(req, res) {
  return res.redirect('/');
};