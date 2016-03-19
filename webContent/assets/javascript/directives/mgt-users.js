'use strict';

angular.module('page-mgt-users', [])
  .directive('mgtUsers', function($http, agGridConf, $filter, glbFac, Users, Customers) {
    return {
      restrict:'E',
      templateUrl: 'assets/partials/mgt-users.html',
      scope: {},
      bindToController: {},
      controllerAs: 'mgt_usrs',
      controller: function(){
        var thiz = this;
        thiz.usrObj = {};
        thiz.rows = [];
        var idSelect = null;//param id for reload grid function
        //get Users list
        thiz.loadGridData = function(){
          //display loader grid
          thiz.gridOptions.api.showLoadingOverlay();
          Users.get('/rest-api/users', function(res) {
            return thiz.gridOptions.api.setRowData(res.users);
          }, function (error) {
            // console.log(error)
            //console.log('Error module');
          });
        };

        var columnDefs = [
          {
            //valueGetter: "",
            headerName: "",
            checkboxSelection: true,
            minWidth: 20,
            width: 20,
            headerClass: 'checkboxSel',
            enableSorting: false
          },
          {headerName: glbFac._i('mgtUsers.headerGrid.customersName'), field: "name_customer"},
          {headerName: glbFac._i('mgtUsers.headerGrid.firstName'), field: "firstName"},
          {headerName: glbFac._i('mgtUsers.headerGrid.lastName'), field: "lastName"},
          {headerName: glbFac._i('mgtUsers.headerGrid.login'), field: "login"},
          // {headerName: glbFac._i('mgtUsers.headerGrid.contact'), field: "contact.email"},
          // {headerName: glbFac._i('mgtUsers.headerGrid.mobile'), width: 110, field: "contact.mobile", cellRenderer: function(data) {
          //   if(_.isUndefined(data.data.contact.mobile.prefixe) || _.isUndefined(data.data.contact.mobile.number)){
          //     return "-";
          //   }else{
          //     return data.data.contact.mobile.prefixe+data.data.contact.mobile.number;
          //   }
          // }},
          // {headerName: glbFac._i('mgtUsers.headerGrid.fix'), width: 110, field: "contact.mobile", cellRenderer: function(data) {
          //   if(_.isUndefined(data.data.contact.fix.prefixe) || _.isUndefined(data.data.contact.fix.number)){
          //     return "-";
          //   }else{
          //     return data.data.contact.fix.prefixe+data.data.contact.fix.number;
          //   }
          // }},
          {headerName: glbFac._i('mgtUsers.headerGrid.create_date'), width: 60, field: "create_date", cellRenderer: function(data) {
            if(_.isUndefined(data.value)){
              return "-";
            }else{
              return moment(data.value).format("L");
            }
          }},
          {headerName: glbFac._i('mgtUsers.headerGrid.last_modif_date'), width: 60, field: "last_modif_date", cellRenderer: function(data) {
            if(_.isUndefined(data.value)){
              return "-";
            }else{
              return moment(data.value).format("L");
            }
          }}
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
          headerHeight: 34,
          rowHeight:36,
          onSelectionChanged: selectedRows,
          enableScrollbars: false,
          overlayLoadingTemplate: '<span class="gridOverlay">'+glbFac._i("common.grid.loading")+'</span><span class="glyphicon glyphicon-repeat loop" aria-hidden="true"></span>',
          overlayNoRowsTemplate: '<span class="gridOverlay">'+glbFac._i("common.grid.noReasult")+'</span>',
          onReady: function() {
            thiz.gridOptions.api.sizeColumnsToFit();
          }
        };

        function headerCellRendererFunc(params) {
          return agGridConf.checkboxFn(params, thiz);
        };

        function selectedRows(event) {
          thiz.rows = event.selectedRows;
        };

        this.getRows = function(){
          return thiz.rows;
        }

        this.onRefreshAll = function() {
          thiz.loadGridData();
        };

        // thiz.createType = function(){
        //   thiz.showCreateType = true;
        // };
      }, link : function(scope, ele, attr, ctrl){
        ctrl.loadGridData();
      }
    };
  })
