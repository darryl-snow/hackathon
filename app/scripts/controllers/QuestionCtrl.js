'use strict';

angular.module('brainJellyApp').controller('QuestionCtrl', function ($scope, $http, Answers, Questions, $routeParams) {
  
  // $http.get('/api/questions/' + $routeParams.questionid).success(function(question) {
  //   $scope.question = question;
  //   console.log(question);
  // });

  Questions.get({
    questionid: $routeParams.questionid
  }, function(question) {

    $scope.question = new Questions({
      text: question.text,
      date: question.date
    });

    var nouns = localStorage.nouns.split(",");
    $scope.noun1 = nouns[0];
    $scope.noun2 = nouns[1];

    $scope.noun1display = $scope.noun1;
    $scope.noun2display = $scope.noun2;

    if($scope.noun1.indexOf('a') == 0 || $scope.noun1.indexOf('e') == 0 || $scope.noun1.indexOf('i') == 0 || $scope.noun1.indexOf('o') == 0 || $scope.noun1.indexOf('u') == 0)
      $scope.noun1display = 'an ' + $scope.noun1display;
    else
      $scope.noun1display = 'a ' + $scope.noun1display;

    if($scope.noun2.indexOf('a') == 0 || $scope.noun2.indexOf('e') == 0 || $scope.noun2.indexOf('i') == 0 || $scope.noun2.indexOf('o') == 0 || $scope.noun2.indexOf('u') == 0)
      $scope.noun2display = 'an ' + $scope.noun2display;
    else
      $scope.noun2display = 'a ' + $scope.noun2display;

    $scope.noun1display = '<span class="keyword">'+$scope.noun1display+'</span>';
    $scope.noun2display = '<span class="keyword">'+$scope.noun2display+'</span>';

    $scope.question.text = $scope.question.text.replace('#keyword#', $scope.noun1display);
    $scope.question.text = $scope.question.text.replace('#keyword#', $scope.noun2display);

    $scope.questiontext = $scope.question.text;

    // $http.get('/api/answers/' + question._id).success(function(answers) {
    //   $scope.answers = answers;
    // });

    Answers.get({
      questionid: $routeParams.questionid
    }, function(answers) {
      $scope.answers = answers;
    });


  });

  $scope.upVote = function(answer) {
    answer.votes += 1
  }

  $scope.downVote = function(answer) {
    answer.votes -= 1
  }

});


angular.module('brainJellyApp').directive('swipable', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      
      var hammertime = Hammer(element).on("swipeLeft", function(event) {
        scope.downVote($(element).data("id"));
        element.addClass("downvoted");
      });

      var hammertime2 = Hammer(element).on("swipeRight", function(event) {
        scope.upVote($(element).data("id"));
        element.addClass("upvoted");
      });

    }
  };
});

