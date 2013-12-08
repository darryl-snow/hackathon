'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var QuestionSchema = new Schema({
  text: String,
  author: String,
  date: Date,
  winner: String,
  participants: Array,
  nouns: Array,
  private: Boolean
});

// Validations
QuestionSchema.path('text').validate(function (str) {
  return str !== "";
}, 'Question cannot be empty');

mongoose.model('Question', QuestionSchema);
