angular.module("brainJellyApp").factory("Questions", [
  "$resource", function($resource) {
    return $resource("api/questions/:questionid", {
      questionId: "@_id"
    }, {
      update: {
        method: "PUT"
      }
    });
  }
]);