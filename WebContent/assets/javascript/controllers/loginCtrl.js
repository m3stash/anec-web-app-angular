"use strict";
webapp.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
	console.log('login')
	$http.get('/rest-api/login', 'laurent', 'duchaussoy').success(function(response){
		console.log('response',response)
	});
}]);