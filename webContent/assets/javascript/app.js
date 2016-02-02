'use strict';
var webapp = angular.module('webapp', [
  'ngRoute', 'ngSanitize', 'httpInterceptor', 'ngMessages', 'ngResource',
  // 3rd party modules.
  'pascalprecht.translate',
  'directives',
  'agGrid',
  'ui.bootstrap',
  'cgNotify',
  'page-mgt-mod-type'
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
    .when('/mgt-module-type', {
      template: '<mgt-mod-type></mgt-mod-type>'
    })
    .otherwise({redirectTo: '/login'});
}])
.config(['$translateProvider', '$httpProvider', function ($translateProvider, $httpProvider) {
	$translateProvider.preferredLanguage('fr');
	$translateProvider.useStaticFilesLoader({
		prefix: 'assets/i18n/',
		suffix: '.json'
	})
  // echape les failles xss possilbles
  $translateProvider.useSanitizeValueStrategy('escape');
  // force data in body for delete methode
  $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
}])
.run(function(glbFac, $rootScope) {
    var language = window.navigator.userLanguage || window.navigator.language;
    moment.locale(language);
});
