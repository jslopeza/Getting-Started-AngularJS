(function() {

    var app = angular.module("githubViewer", []);

    var MainController = function($scope, github, $interval, $log, $anchorScroll, $location) {

        var onUserComplete = function(data) {
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos, onError);
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch the user";
        };

        var onRepos = function(data) {
            $scope.repos = data;
            $location.hash("userdetails");
            $anchorScroll();
        };

        var decrementCountdown = function(){
            $scope.countdown -= 1;
            if($scope.countdown < 1){
                $scope.search($scope.username);
            }
        };

        var countDownInterval = null;

        var startCountdown = function(){
            countDownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search = function(username) {
            github.getUser(username).then(onUserComplete,onError); 
            if(countDownInterval){
                $interval.cancel(countDownInterval);
                $scope.countdown = null;
            }
        };

        $scope.username = "angular";
        $scope.message = "Github Viewer";
        $scope.repoSortOrder = "-stargazers_count";
        $scope.countdown = 5;
        startCountdown();
    };

    app.controller("MainController", MainController);
}());