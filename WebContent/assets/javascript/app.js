'use strict';
var webapp = angular.module('webapp', [
  'ngRoute', 'ngSanitize',
  // 3rd party modules.
  'pascalprecht.translate'
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
		.otherwise({redirectTo: '/login'});
}])
.config(['$translateProvider', function ($translateProvider) {
		$translateProvider.preferredLanguage('fr');
		$translateProvider.useStaticFilesLoader({
			prefix: 'assets/i18n/',
			suffix: '.json'
		})
}])
.run(function() {
    console.log("app run");
});
