'use strict';

angular.module('brainJellyApp').controller('TodaysQuestionCtrl', function ($scope, $http, Questions, Answers, $location) {

  $scope.charactercount = 140;
  $scope.cansend = false;

  $http.get('/api/nouns').success(function(nouns) {
    $scope.noun1 = nouns[0];
    $scope.noun2 = nouns[1];
    localStorage.nouns = nouns

    $http.get('/api/today').success(function(question) {
      $scope.question = question[0];

      $scope.answer = new Answers({
        question: $scope.question._id,
        date: new Date()
      });

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
    });

  });

  $scope.send = function() {

    if($scope.cansend) {

      $scope.answer.$save(function(response){
        if(response.errors != "undefined") {
          $scope.answer = response;
          $location.path("/" + response.question);
        } else
          console.log(response.errors.name.message);
      });

    }

  }

});

angular.module('brainJellyApp').directive('onEnter', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      return element.on('keydown', function(event) {
        if (event.which === 13) {
          return scope.$apply(attrs.onEnter);
        }
      });
    }
  };
});

angular.module('brainJellyApp').directive('onKeyDown', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      return element.on('keydown', function(event) {
        if($(element).val().length)
          scope.charactercount = 140 - $(element).val().length - 1;
        else
          scope.charactercount = 140;

        if($(element).val().indexOf(scope.noun1) != -1 && $(element).val().indexOf(scope.noun2) != -1 && scope.charactercount > 0)
          scope.cansend = true;
        else
          scope.cansend = false;

        scope.$apply();
      });
    }
  };
});

angular.module('brainJellyApp').directive('closeSidebar', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.find("a").on("click", function() {
        $.sidr('close', 'sidr');
      });
    }
  };
});
