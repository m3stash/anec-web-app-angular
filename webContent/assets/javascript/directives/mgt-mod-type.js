'use strict';
angular.module('page-mgt-mod-type', [])
.directive('mgtModType', function ($http, agGridConf, $filter, glbFac) {
  return {
    restrict:'E',
    controllerAs: 'mgt_mt',
    scope: {},
    bindToController: {},
    templateUrl: 'assets/partials/mgt-mod-type.html',
    controller: function myCtrl(){
      var thiz = this;
      thiz.modObj = {};
      thiz.rows = [];
      var idSelect = null;//param id for reload grid function
      //get data from module type
      $http.get('/rest-api/modules').then(function(res){
        console.log(res)
        thiz.modulesOptions = res.data.modulesList;
      }, function (error) {
        //console.log('Error module');
      });

      //get data from module type
      thiz.loadGridData = function(id){
        //display loader grid
        thiz.gridOptions.api.showLoadingOverlay();
        if(_.isUndefined(id)){
          thiz.gridOptions.api.setRowData([]);
        }else{
          $http.get('/rest-api/modules/'+id+'/modules_type').then(function(res){
            thiz.gridOptions.api.setRowData(res.data.moduleTypeList);
            var idSelect = id;
          }, function (error) {
            //console.log('Error module');
          });
        }
      };

      var columnDefs = [
        {
          //valueGetter: "",
          headerName: "",
          checkboxSelection: true,
          minWidth: 20,
          width: 20,
          headerClass: 'checkboxSel',
          suppressSorting: false
        },
        //headerName: $filter('translate')('APPLIANCE.NAME'),
        {headerName: glbFac._i('mgtModType.headerGrid.id'), field: "_id"},
        {headerName: glbFac._i('mgtModType.headerGrid.name'), field: "name"},
        {headerName: glbFac._i('mgtModType.headerGrid.create_date'), field: "create_date", cellRenderer: function(data) {
          if(_.isUndefined(data.value)){
            return "-";
          }else{
            return moment(data.value).format("L");
          }
        }},
        {headerName: glbFac._i('mgtModType.headerGrid.last_modif_date'), field: "last_modif_date", cellRenderer: function(data) {
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

      this.onRefreshAll = function(id) {
        thiz.loadGridData(id);
      };

      thiz.createType = function(){
        thiz.showCreateType = true;
      };
    }
  }
})
