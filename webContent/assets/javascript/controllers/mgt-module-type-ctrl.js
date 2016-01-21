angular.module('webapp').controller('mgtModuleTypeCtrl', function ($scope, $http, agGridConf, $filter, glbFac) {
  var token = localStorage.getItem('token');
  $scope.modObj = {};

  //get data from module type
  $http({
    method: 'get',
    url: '/rest-api/modules',
    headers: {
      "Authorization": "Bearer "+token
    }
  }).then(function(res){
    $scope.modulesOptions = res.data.modulesList;
  }, function (error) {
    //console.log('Error module');
  });

  //get data from module type
  $scope.loadGridData = function(id){
    $http({
      method: 'get',
      url: '/rest-api/modules/'+id+'/modules_type',
      headers: {
        "Authorization": "Bearer "+token
      }
    }).then(function(res){
      $scope.gridOptions.api.setRowData(res.data.moduleTypeList);
    }, function (error) {
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
      suppressSorting: true
    },
    //headerName: $filter('translate')('APPLIANCE.NAME'),
    {headerName: glbFac._i('mgtModType.headerGrid.id'), field: "id"},
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
    onReady: function() {
      $scope.gridOptions.api.sizeColumnsToFit();
    }
  };

  function headerCellRendererFunc(params) {
    return agGridConf.checkboxFn(params, $scope);
  };

  function selectedRows(event) {
    console.log('ici',event.selectedRows);
  };

  $scope.createType = function(){
    $scope.showCreateType = true;
  }

});
