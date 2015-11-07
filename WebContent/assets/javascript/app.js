'use strict';
var webapp = angular.module('webapp', [
  'ngRoute'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/home', {
	        templateUrl: 'assets/partials/home.html',
	        controller: 'MainCtrl'
	    })
	    .when('/login', {
	        templateUrl: 'assets/partials/login.html',
	        controller: 'LoginCtrl'
	    })
		.otherwise({redirectTo: '/'});
}])
.run(function() {
    console.log("app run");
});
