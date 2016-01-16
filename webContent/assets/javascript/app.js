'use strict';
var webapp = angular.module('webapp', [
  'ngRoute', 'ngSanitize', 'httpInterceptor',
  // 3rd party modules.
  'pascalprecht.translate',
  'directives',
  'agGrid'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	  .when('/login', {
	    templateUrl: 'assets/partials/login.html'
	  })
    .when('/main', {
	     templateUrl: 'assets/partials/main.html'
	  })
    .when('/modulesByDistrict', {
      templateUrl: 'assets/partials/modulesByDistrict.html'
    })
    .when('/create_module_type', {
      templateUrl: 'assets/partials/mgt-mod-type.html'
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
.run(function(glbFac, $rootScope) {
    //console.log("app run");
});
