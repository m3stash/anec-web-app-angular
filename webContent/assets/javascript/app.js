'use strict';
var webapp = angular.module('webapp', [
  'ngRoute', 'ngSanitize', 'httpInterceptor',
  // 3rd party modules.
  'pascalprecht.translate',
  'directives'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	  .when('/login', {
	      templateUrl: 'assets/partials/login.html'
	  })
    .when('/main', {
	      templateUrl: 'assets/partials/main.html'
	  })
    .otherwise({redirectTo: '/login'});
}])
.config(['$translateProvider', function ($translateProvider) {
		$translateProvider.preferredLanguage('fr');
		$translateProvider.useStaticFilesLoader({
			prefix: 'assets/i18n/',
			suffix: '.json'
		})
    // echape les failles xss possilbles
    $translateProvider.useSanitizeValueStrategy('escape');
}])
.run(function() {
    //console.log("app run");
});
