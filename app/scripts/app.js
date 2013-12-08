'use strict';

angular.module('brainJellyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/question',
        controller: 'TodaysQuestionCtrl'
      })
      .when('/:questionid', {
        templateUrl: 'partials/answers',
        controller: 'QuestionCtrl'
      })
      .when('/questions', {
        templateUrl: 'partials/questions',
        controller: 'QuestionsCtrl'
      })
      .when('/new', {
        templateUrl: 'partials/new',
        controller: 'NewQuestionCtrl'
      })
      .when('/challenge-your-friends', {
        templateUrl: 'partials/new',
        controller: 'ChallengeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
