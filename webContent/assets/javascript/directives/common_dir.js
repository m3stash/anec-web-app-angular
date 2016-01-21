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
.directive('modulesByDistrict', function($http) {
  return {
    restrict:'A',
    controller : function(){

      var token = localStorage.getItem('token');
      var thiz = this;
      this.moduleObj = {}

      // get country list
      $http({
        method: 'get',
        url: '/rest-api/country/read',
        headers: {
          "Authorization": "Bearer "+token
        }
      }).then(function(response){
        thiz.countryOptions = response.data.countryList;
      }, function (error) {
        //error
      });

      //get district list
      thiz.refreshDisctrict = function(id){
        if(id === null){
          return;
        }
        $http({
          method: 'get',
          url: '/rest-api/district',
          headers: {
            "Authorization": "Bearer "+token
          },
          data: {
            id_country: id
          }
        }).then(function(response){
          thiz.districtOptions = response.data.districtList;
        }, function (error) {
          //error
        });
      }

      //get module
      $http({
        method: 'get',
        url: '/rest-api/modules',
        headers: {
          "Authorization": "Bearer "+token
        }
      }).then(function(response){
        thiz.moduleOptions = response.data.modulesList;
      }, function (error) {
        //error
      });

      // this.sendModules = function(){
      //   console.log(this.sendModules)
      // }
      // var thiz = this;
      // var token = localStorage.getItem('token');
      // $http({
      //   method: 'post',
      //   url: '/rest-api/modulesByDistrict',
      //   headers: {
      //       "Authorization": "Bearer "+token
      //   },
      //   data: {
      //     obj: modulesObj
      //   }
      // }).then(function(response){
      //   thiz.modules = response.data.modulesList;
      //   console.log(thiz.modules)
      // }, function (error) {
      //   console.log('error')
      //   //error
      // });
    },
    controllerAs:"modulesByDistrictCtrl"
  };
})
.directive('topMenu', function() {
  return {
    restrict:'E',
    replace: true,
    controller : function(){
    },
    templateUrl: 'assets/partials/templates/top-menu.html',
    link: function(scope, ele, attr, ctrl){

    }
  }
})
.directive('navMenu', function() {
  return {
    restrict:'E',
    replace: true,
    controller : function(){
    },
    templateUrl: 'assets/partials/templates/nav-menu.html',
    link: function(scope, ele, attr, ctrl){

    }
  }
})
.directive('toggleMenu', function() {
  return {
    restrict:'A',
    link: function(scope, ele, attr, ctrl){
      $(ele).on('click', function(){
        $('.nav-menu').slideToggle('slow');
      });
    }
  }
})
.directive('modalAddModType', function($uibModal) {
  return {
    restrict:'A',
    link: function(scope, ele, attr, ctrl){
      var size = "";
      scope.animationsEnabled = true;
      $(ele).on('click', function(){
        var modalInstance = $uibModal.open({
          animation: scope.animationsEnabled,
          templateUrl: 'assets/partials/templates/modales/modalAddModType.html',
          controller: 'modalAddModTypeCtrl',
          size: size,
          resolve: {
            items: function () {
              return scope.items;
            }
          }
        });
      });
    }
  }
})
