(function() {
	angular.module('mr.ng', [])
	var app = angular.module('MRBoxTalk', ['mr.ng'])

	app.controller('Controller', function($scope, $timeout, $q) {
		$scope.waitsAndResolves = function() {
			var dfd = $q.defer()
			$timeout(function() {
				dfd.resolve()
			}, 2000);
			return dfd.promise
		}

		$scope.waitsAndRejects = function() {
			var dfd = $q.defer()
			$timeout(function() {
				dfd.reject()
			}, 1000);
			return dfd.promise
		}

		$scope.imgUrl = "/images/foo.jpg"
	})
})()
