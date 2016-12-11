angular.module("umbraco").controller("tweet.editorcontroller", function ($scope, $http, notificationsService) {
    if (angular.isArray($scope.model.value) === false) {
        $scope.model.value = [];
    }
    $scope.add = function (tweet) {
        if (parseInt($scope.model.config.maxTweets) > $scope.model.value.length) {
            $scope.model.value.push(tweet);
        } else {
            notificationsService.warning("TOO MANY TWEETS!");
        }
    };
    $scope.remove = function (index) {
        $scope.model.value.splice(index, 1);
    };

    $scope.search = function (term) {

        if (term && term.length > 5) {
            var url = "backoffice/api/twitter/search/?term=" + term;

            $http.get(url).then(function (response) {
                $scope.model.results = response.data;
            });
        } else {
            $scope.model.results = [];
        }
        $scope.model.results = ["you", "searched", "for", term];
    };
});