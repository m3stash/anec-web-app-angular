angular.module('directives', [])
.directive('login', function($http, $location) {
  return {
    restrict:'A',
    controller : function(){
      this.loginObj = {};
      this.loginForm = function(){
        $http.post('/rest-api/login',this.loginObj).then(function (response) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.token);
          $location.search({});
          $location.path("/main");
        }, function (error) {
          //error
        });
      }
    },
    controllerAs:"loginCtrl"
  };
})
.directive('main', function($http) {
  return {
    restrict:'A',
    controller : function(){
      var thiz = this
      var token = localStorage.getItem('token');
      $http({
        method: 'get',
        url: '/rest-api/modules/read',
        headers: {
            "Authorization": "Bearer "+token
        },
        data: {
          //"obj": "test"
        }
      }).then(function(response){
        thiz.modules = response.data.modulesList;
        console.log(thiz.modules)
      }, function (error) {
        console.log('error')
        //error
      });
    },
    controllerAs:"mainCtrl"
  };
})
.directive('contracts', function($http) {
  return {
    restrict:'A',
    controller : function(){
      this.send = function(){
        var token = localStorage.getItem('token');
        $http({
          method: 'post',
          url: '/rest-api/contracts/create',
          headers: {
              "Authorization": "Bearer "+token
          },
          data: {}
        });
      }
    },
    controllerAs:"contractsCtrl"
  };
})
.directive('menuTop', function($http) {
  return {
    restrict:'A',
    controller : function(){
      var user = JSON.parse(localStorage.getItem('user'));
      if(user){
        this.firstname = user.firstName;
        this.lastName = user.lastName;
      }
    },
    controllerAs:"menuTopCtrl"
  };
})
