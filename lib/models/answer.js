'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var AnswerSchema = new Schema({
  text: String,
  question: String,
  author: String,
  votes: Number
});

// Validations
AnswerSchema.path('question').validate(function (str) {
  return str != "";
}, 'Answer cannot be empty');

mongoose.model('Answer', AnswerSchema);
