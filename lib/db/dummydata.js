'use strict';

var mongoose = require('mongoose'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer'),
    Noun = mongoose.model('Noun'),
    User = mongoose.model('User');

User.find({}).remove(function(){
  User.create({
    name: 'Darryl Snow',
    email: 'darryl.snow@profero.com',
    password: 'blibble',
    username: 'darrylsnow',
    score: 100
  }, {
    name: 'Edward Hutchins',
    email: 'edward.hutchins@profero.com',
    password: 'blibble',
    username: 'edwardhutchins',
    score: 50
  }, {
    name: 'Chris McMath',
    email: 'chris.mcmath@profero.com',
    password: 'blibble',
    username: 'chrismcmath',
    score: 0
  }, function(err) {
      console.log('finished populating users');
    }
  );
});

var today = new Date();
today.setHours(0,0,0,0);
var yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
Question.find({}).remove(function() {
  Question.create({
    text : 'How would you build a spaceship using #keyword# and #keyword#?',
    author : 'darrylsnow',
    date: today,
    private: false
  }, {
    text : 'What form of transport could be made from #keyword# and #keyword#?',
    author : 'edwardhutchins',
    date: yesterday,
    private: false
  }, {
    text : 'Using #keyword# and #keyword#, how would you transport a table to the other side of the world?',
    author : 'chrismcmath',
    date : today,
    private: true
  }, function(err) {
      console.log('finished populating questions');
    }
  );
});

Answer.find({}).remove(function() {
  Answer.create({
    text: 'this is my answer',
    question: '1',
    author: '1',
    votes: 10
  }, {
    text: 'this is Eddies answer',
    question: '1',
    author: '2',
    votes: 0
  }, {
    text: 'this is Chris answer',
    question: '1',
    author: '3',
    votes: 3
  }, function(err) {
      console.log('finished populating answers');
    }
  );
});

Noun.find({}).remove(function() {
  Noun.create({
    noun : 'apple'
  }, {
    noun : 'banana'
  }, {
    noun : 'sausage'
  }, {
    noun : 'ladder'
  }, {
    noun : 'rope'
  }, {
    noun : 'trampoline'
  }, {
    noun : 'sock'
  }, {
    noun : 'boomerang'
  }, function(err) {
      console.log('finished populating nouns');
    }
  );
});