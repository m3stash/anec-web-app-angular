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
  'page-main'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	  .when('/login', {
	    templateUrl: 'assets/partials/login.html'
	  })
    .when('/main', {
	     template: '<main-page></main-page>'
	  })
    .when('/modulesByDistrict', {
      templateUrl: 'assets/partials/modulesByDistrict.html'
    })
    .when('/mgt-module-type', {
      template: '<mgt-mod-type></mgt-mod-type>', reloadOnSearch: false
    })
    .otherwise({redirectTo: '/login'});
}])
.config(['$translateProvider', '$httpProvider', function ($translateProvider, $httpProvider) {
  if(_.isNull(localStorage.getItem('lang'))){
    localStorage.setItem('lang', window.navigator.userLanguage || window.navigator.language);
  }
  var lang = localStorage.getItem('lang');
	$translateProvider.preferredLanguage(lang);
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
  if(_.isNull(localStorage.getItem('lang'))){
    localStorage.setItem('lang', window.navigator.userLanguage || window.navigator.language);
  }
  var lang = localStorage.getItem('lang');
  moment.locale(lang);
});
