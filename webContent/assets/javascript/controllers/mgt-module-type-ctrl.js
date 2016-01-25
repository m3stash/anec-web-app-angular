angular.module('webapp').controller('mgtModuleTypeCtrl', function ($scope, $http, agGridConf, $filter, glbFac) {
  var token = localStorage.getItem('token');
  $scope.modObj = {};
  $scope.rows = [];
  //get data from module type
  $http.get('/rest-api/modules').then(function(res){
    $scope.modulesOptions = res.data.modulesList;
  }, function (error) {
    //console.log('Error module');
  });

  //get data from module type
  $scope.loadGridData = function(id){
    //display loader grid
    $scope.gridOptions.api.showLoadingOverlay();
    if(_.isUndefined(id)){
      $scope.gridOptions.api.setRowData([]);
    }else{
      $http.get('/rest-api/modules/'+id+'/modules_type').then(function(res){
        console.log('ici',res)
        $scope.gridOptions.api.setRowData(res.data.moduleTypeList);
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
      suppressSorting: true
    },
    //headerName: $filter('translate')('APPLIANCE.NAME'),
    {headerName: glbFac._i('mgtModType.headerGrid.id'), field: "_id"},
    {headerName: glbFac._i('mgtModType.headerGrid.name'), field: "name"},
  ];

  $scope.gridOptions = {
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
      $scope.gridOptions.api.sizeColumnsToFit();
    }
  };

  function headerCellRendererFunc(params) {
    return agGridConf.checkboxFn(params, $scope);
  };

  function selectedRows(event) {
    $scope.rows = event.selectedRows;
  };

  $scope.createType = function(){
    $scope.showCreateType = true;
  }

});
