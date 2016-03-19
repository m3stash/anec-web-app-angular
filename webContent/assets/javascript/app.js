'use strict';
var webapp = angular.module('webapp', [
  'ngRoute', 'ngSanitize', 'httpInterceptor', 'ngMessages', 'ngResource',
  // 3rd party modules.
  'pascalprecht.translate',
  'directives',
  'agGrid',
  'ui.bootstrap',
  'cgNotify',
  'googlechart',
  'page-mgt-mod-type',
  'page-mgt-users',
  'page-main'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
	  .when('/login', {
      template: '<login></login>'
	  })
    .when('/main', {
	     template: '<main-page></main-page>'
	  })
    .when('/mgt-module-type', {
      template: '<mgt-mod-type></mgt-mod-type>'
    })
    .when('/mgt-users', {
      template: '<mgt-users></mgt-users>'
    })
    .otherwise({redirectTo: '/login'});
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}])
.config(['$translateProvider', '$httpProvider', '$locationProvider', function ($translateProvider, $httpProvider, $locationProvider) {
  if(_.isNull(localStorage.getItem('lang'))){
    localStorage.setItem('lang', window.navigator.userLanguage || window.navigator.language);
  }
  var lang = localStorage.getItem('lang');
	$translateProvider.preferredLanguage(lang);
	$translateProvider.useStaticFilesLoader({
		prefix: 'assets/i18n/',
		suffix: '.json'
	})
  //for remove the '#' in url
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  // escape xss for traduction
  $translateProvider.useSanitizeValueStrategy('escape');
  // force data in body for delete methode
  $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
}])
.run(function(glbFac, $rootScope) {
  if(_.isNull(localStorage.getItem('lang'))){
    localStorage.setItem('lang', window.navigator.userLanguage || window.navigator.language);
  }
  var lang = localStorage.getItem('lang');
  moment.locale(lang);
});
