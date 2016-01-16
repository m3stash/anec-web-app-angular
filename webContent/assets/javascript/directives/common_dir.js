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
.directive('mgtModType', function($http, $timeout, agGridConf, $filter, glbFac) {
  return {
    restrict:'A',
    controller : function(){
      var thiz = this;
      var token = localStorage.getItem('token');
      thiz.modObj = {};

      //get data from module type
      $http({
        method: 'get',
        url: '/rest-api/modules',
        headers: {
          "Authorization": "Bearer "+token
        }
      }).then(function(res){
        thiz.modulesOptions = res.data.modulesList;
      }, function (error) {
        //console.log('Error module');
      });

      //get data from module type
      thiz.loadGridData = function(id){
        $http({
          method: 'get',
          url: '/rest-api/modules/'+id+'/modules_type',
          headers: {
            "Authorization": "Bearer "+token
          }
        }).then(function(res){
          var data = [
            {id: 'toto', name: 'titi'}, {id: 'toto', name: 'titi'},
            {id: 'toto', name: 'titi'}, {id: 'toto', name: 'titi'},
            {id: 'toto', name: 'titi'}, {id: 'toto', name: 'titi'},
            {id: 'toto', name: 'titi'}, {id: 'toto', name: 'titi'},
            {id: 'toto', name: 'titi'}, {id: 'toto', name: 'titi'},
            {id: 'toto', name: 'titi'}, {id: 'toto', name: 'titi'},
            {id: 'toto', name: 'titi'}, {id: 'toto', name: 'titi'},
            {id: 'toto', name: 'titi'}, {id: 'toto', name: 'titi'},
            {id: 'toto', name: 'titi'}, {id: 'toto', name: 'titi'}
          ]
          thiz.gridOptions.api.setRowData(data);
          //thiz.gridOptions.api.setRowData(res.data.moduleTypeList);
        }, function (error) {
          //console.log('Error module');
        });
      };

      var columnDefs = [
        {
          //valueGetter: "",
          headerName: "",
          checkboxSelection: true,
          width: 10,
          headerClass: 'checkboxSel',
          suppressSorting: true
        },
        //headerName: $filter('translate')('APPLIANCE.NAME'),
        {headerName: glbFac._i('mgtModType.headerGrid.id'), field: "id"},
        {headerName: glbFac._i('mgtModType.headerGrid.name'), field: "name"},
      ];

      thiz.gridOptions = {
        columnDefs: columnDefs,
        rowData: [],
        enableColResize: true,
        angularCompileRows: false,
        rowSelection: 'multiple',
        suppressRowClickSelection: true,
        headerCellRenderer: headerCellRendererFunc,
        enableFilter: true,
        enableSorting: true,
        headerHeight: 30,
        rowHeight:30,
        onSelectionChanged: selectedRows,
        onReady: function() {
          thiz.gridOptions.api.sizeColumnsToFit();
        }
      };

      function headerCellRendererFunc(params) {
        return agGridConf.checkboxFn(params, thiz);
      };

      function selectedRows(event) {
        console.log('ici',event.selectedRows);
      };

    }, link : function(scope, ele, attr, ctrl){
      ctrl.createType = function(){
        scope.showCreateType = true;
      }
    },
    controllerAs:"mgtModTypeCtrl"
  }
})
