'use strict';

angular.module('directives', [])
.directive('ctnTop', function($route) {
  return {
    restrict:'E',
    template: '<div ng-if="showMenuTop"><menu-top></menu-top><nav-menu></nav-menu><div>',
    link: function(scope, ele, attr, ctrl){
      scope.showMenuTop = true;
       scope.$on('$routeChangeSuccess', function (param) {
         if($route.current.$$route && $route.current.$$route.originalPath === "/login"){
           scope.showMenuTop = false;
         }else{
           scope.showMenuTop = true;
         }
       });
    }
  };
})
.directive('login', function($http, $location) {
  return {
    restrict:'E',
    templateUrl: 'assets/partials/login.html',
    controller: function(){
      var thiz = this;
      thiz.loginObj = {};
      thiz.error = false;
      thiz.loginForm = function(){
        $http.post('/rest-api/login',this.loginObj).then(function (response) {
          if(response === false){
            thiz.error = true;
          }else{
            thiz.error = false;
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            console.log('ici',$location.$$search.url)
            if(!_.isUndefined($location.$$search.url)){
              $location.path($location.$$search.url);
              $location.search({});
            }else{
              $location.search({});
              $location.path("/main");
            }
          }
        }, function (error) {
          //error
          console.log('err',error)
        });
      }
    },
    controllerAs:"loginCtrl",
    link: function(scope, ele, attr, ctrl){

    }
  };
})
.directive('contracts', function($http) {
  return {
    restrict:'A',
    controller : function(){
      this.send = function(){
        $http.post('/rest-api/contracts/create');
      }
    },
    controllerAs:"contractsCtrl"
  };
})
.directive('menuTop', function($http, $timeout, $route, $translate, $location) {
  return {
    restrict:'E',
    controllerAs:"menuTopCtrl",
    templateUrl: 'assets/partials/templates/top-menu.html',
    controller : function(){
      var thiz = this;
      var user = JSON.parse(localStorage.getItem('user'));
      if(user){
        thiz.firstname = user.firstName;
        thiz.lastName = user.lastName;
        thiz.isAdmin = user.isAdmin;
      }
      //set language in local storage
      thiz.changeLang = function(lang){
        localStorage.setItem('lang',lang);
        $route.reload();
        $translate.use(lang)
      }
      if(!_.isNull(localStorage.getItem('lang'))){
        thiz.idSelectedLang = localStorage.getItem('lang');
      }
      thiz.listLang = [{id:"fr", value:"Français"},{id:"en", value:"English"}];
      thiz.logout = function(){
        var data = localStorage.getItem('user');
        $http.post('/rest-api/logout', data).then(function(res){
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          $location.path('/login')
          $route.reload();
        }, function(err){
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          $location.path('/login')
        });
      };
    }
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
    },
    controllerAs:"modulesByDistrictCtrl"
  };
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
.directive('modalMgtModType', function($uibModal, notify, glbFac) {
  return {
    restrict:'E',
    require: '^mgtModType',
    template: '<button ng-click="gesModType()" ng-disabled="{{condition}}" idModule="{{modObj.modulesList}}" type="button"'+
      'class="btn default">{{"button."+actionType | translate}}</button>',
    scope: {
      idModule : "=",
      actionType: "@",
      rows: "=",
      condition: "@"
    },
    // bindToController: {},
    link: function(scope, ele, attr, ctrl){
      var size = "";
      var items = {};
      items.actionType = scope.actionType;
      scope.animationsEnabled = true;
      var url = 'assets/partials/templates/modales/modalMgtModType.html';
      if(scope.actionType === 'delete'){
        url = 'assets/partials/templates/modales/modalDeleteType.html';
      }
      scope.gesModType = function(){
        if(_.isUndefined(scope.idModule)){
          notify({message : glbFac._i('error.modalAddModType.idModule'), duration: 2000});
        }else{
          items.rows = ctrl.getRows();
          items.idModule = scope.idModule;
          var modalInstance = $uibModal.open({
            animation: scope.animationsEnabled,
            templateUrl: url,
            controller: 'modalMgtModTypeCtrl',
            size: size,
            resolve: {
              items: function () {
                return items;
              }
            }
          });
          modalInstance.result.then(function (cause) {
            if(cause === 'save'){
              ctrl.onRefreshAll(ctrl.modObj.modulesList);
            }
          }, function () {
            //error
          });
        }
      };
    }
  }
})
.directive('modalMgtUsers', function($uibModal, notify, glbFac) {
  return {
    restrict:'E',
    require: '^mgtUsers',
    template: '<button ng-click="gesUsr()" ng-disabled="{{condition}}" type="button"'+
      'class="btn default">{{"button."+actionType | translate}}</button>',
    scope: {
      actionType: "@",
      rows: "=",
      condition: "@"
    },
    link: function(scope, ele, attr, ctrl){
      var size = "";
      var items = {};
      items.actionType = scope.actionType;
      scope.animationsEnabled = true;
      var url = 'assets/partials/templates/modales/modalMgtUsers.html';
      if(scope.actionType === 'delete'){
        url = 'assets/partials/templates/modales/modalDeleteType.html';
      }
      scope.gesUsr = function(){
        items.rows = ctrl.getRows();
        items.idModule = scope.idModule;
        var modalInstance = $uibModal.open({
          animation: scope.animationsEnabled,
          templateUrl: url,
          controller: 'modalMgtUsersCtrl',
          size: size,
          resolve: {
            items: function () {
              return items;
            }
          }
        });
        modalInstance.result.then(function (cause) {
          if(cause === 'save'){
            ctrl.onRefreshAll();
          }
        }, function () {
          //error
        });

      };
    }
  }
})
.directive('selectBox', function($timeout) {
  return {
    restrict:'E',
    scope: {
      list: "=",
      defaultValue: "@",
      click: "=",
      defaultSelected: "="
    },
    template:
      '<div class="btn-group" uib-dropdown keyboard-nav>'+
        '<button id="simple-btn-keyboard-nav" type="button" class="btn btn-primary" uib-dropdown-toggle>'+
          '</span>{{value}}<span class="caret"></span>'+
        '</button>'+
        '<ul uib-dropdown-menu role="menu" aria-labelledby="simple-btn-keyboard-nav">'+
          '<li ng-class="{selected: item.id === itmId}" ng-repeat="item in sbList" ng-click="click(item.id); returnValue(item)" role="menuitem"><a>{{item.value}}</a></li>'+
        '</ul>'+
      '</div>',
    link: function(scope, ele, attr, ctrl){
      var list = [];
      scope.$on('$destroy',scope.$watch("list", function(oldVal,newVal){
        if(scope.list && scope.list.length > 0){
          //aray void but default val is display if defaultValue present
          if(!_.isUndefined(scope.defaultValue) && scope.defaultValue !== ""){
            list = angular.copy(scope.list);
            list.unshift({id:null, value: scope.defaultValue})
            scope.sbList = list;
            scope.value = scope.defaultValue;
          }else{
            scope.sbList = scope.list;
          }
          //if default value selected
          if(!_.isUndefined(scope.defaultSelected)){
            _.each(scope.list, function(list){
              if(list.id === scope.defaultSelected){
                scope.itmId = list.id;
                scope.value = list.value;
              }
            });
          }
        }else{
          //aray void but default val is display if defaultValue present
          if(!_.isUndefined(scope.defaultValue)){
            scope.sbList = [{id:null, value: scope.defaultValue}];
          }
        }
        scope.returnValue = function(itm){
          scope.value = itm.value;
          scope.itmId = itm.id;
        }
      }));
    }
  }
})
