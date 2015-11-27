"use strict";
webapp.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
	console.log('oui')
	$scope.msg = 'coucou 2';
	$http.get('rest-api/test')
}]);
