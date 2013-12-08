angular.module("brainJellyApp").factory("Answers", [
  "$resource", function($resource) {
    return $resource("api/answers/:questionid", {
      questionId: "@_id"
    }, {
      get: {
        method: "GET",
        isArray: true
      },
      update: {
        method: "PUT"
      }
    });
  }
]);