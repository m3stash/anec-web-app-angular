'use strict';
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
        //console.log(thiz.modules)
      }, function (error) {
        //console.log('error')
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
        $http.post('/rest-api/contracts/create');
      }
    },
    controllerAs:"contractsCtrl"
  };
})
.directive('menuTop', function($http, $timeout, $route, $translate, $location) {
  return {
    restrict:'A',
    controllerAs:"menuTopCtrl",
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
        $http.get('/rest-api/logout').then(function(res){
          localStorage.removeItem('token');
          $location.path('/login')
        }, function(err){
          //
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
.directive('modalAddModType', function($uibModal, notify, glbFac) {
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
      var url = 'assets/partials/templates/modales/modalAddModType.html';
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
            controller: 'modalAddModTypeCtrl',
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
.directive('selectBox', function($timeout) {
  return {
    restrict:'E',
    scope: {
      list: "=",
      defaultValue: "=",
      click: "=",
      defaultSelected: "="
    },
    template:
      '<div class="btn-group" uib-dropdown keyboard-nav>'+
        '<button id="simple-btn-keyboard-nav" type="button" class="btn btn-primary" uib-dropdown-toggle>'+
          '</span>{{value}} <span class="caret"></span>'+
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
          if(!_.isUndefined(scope.defaultValue)){
            list = scope.list.unshift({id:null, value: scope.defaultValue});
            scope.value = scope.defaultValue;
            scope.sbList = scope.list;
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
