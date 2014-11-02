(function(){

	var app = angular.module("githubViewer");

	var ReposController = function($scope, github, $routeParams){

		var onRepo = function(data){
			$scope.repo = data;
		};

		var onError = function(reason){
			$scope.error = reason;
		};

		var reponame = $routeParams.reponame;
		var username = $routeParams.username;

		github.getRepoDetails(username, reponame)
				.then(onRepo, onError);
	};

	app.controller("ReposController", ReposController);

}());