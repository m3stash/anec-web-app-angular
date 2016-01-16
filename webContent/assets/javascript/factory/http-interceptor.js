angular.module('httpInterceptor', []).
config(function ($httpProvider) {
	$httpProvider.interceptors.push('httpInterceptor');
}).
// register the interceptor as a service
factory('httpInterceptor', function($q, $location, $rootScope) {
	return {
	    // optional method
		'request': function(config) {
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
	    	// do something on success
	    	if(response.config.url.split('/')[0] == 'intractiv-rest-api'){
	    		$('.whiteBox').hide();
	    	}
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
				//window.location.href = "/login.html?url="+$location.url();
				return false;
			}
//			if (canRecover(rejection)) {
//				return responseOrNewPromise;
//			}
			return $q.reject(rejection);
		}
	};
});
