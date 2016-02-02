angular.module('httpInterceptor', []).
config(function ($httpProvider) {
	$httpProvider.interceptors.push('httpInterceptor');
}).
// register the interceptor as a service
factory('httpInterceptor', function($q, $location, $rootScope) {
	return {
	    // optional method
		'request': function(config) {
			//token injection for all request
			// console.log(config.headers)
			config.headers.Authorization = "bearer "+localStorage.getItem('token');
			return config || $q.when(config);
		},

	    // optional method
		'requestError': function(rejection) {
	      // do something on error
			if (canRecover(rejection)) {
				return responseOrNewPromise;
			}
			return $q.reject(rejection);
		},

	    // optional method
	    'response': function(response) {
	    	return response || $q.when(response);
	    },

	    // optional method
		'responseError': function(rejection) {
			/*test affichage notification si erreur dans requete api
			 * uniquement sur si local dans url */
			var host = $location.host();
			var title = rejection.status + " : " + rejection.statusText;
			var urlApi = rejection.config.url.split("rest-api");
			var bodyMsg = urlApi[1];
			if (host.indexOf("localhost")>-1){
				if(window.Notification && Notification.permission !== "denied") {
					Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
						var n = new Notification(title, {body: bodyMsg, icon: "assets/images/common/icon/warning.png"});
						setTimeout(function(){
							n.close();
						}, 6000);
					});
				}
			}

			//si 401 => on ouvre la modale de login
			if(rejection.status == '401'){
        console.log('401')
				return false;
			}

			return $q.reject(rejection);
		}
	};
});
