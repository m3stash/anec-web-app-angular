angular.module('webapp').controller('modalAddModTypeCtrl', function ($scope, $uibModalInstance, items, $http) {
  $scope.formObj = {};
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  console.log(items);
  $scope.submit = function(formValid){
    //formValid
    if(true){
      if(items.actionType === 'create'){
        var data = {};
        data.name = $scope.formObj.type;
        data.id = $scope.formObj.id;
        $http.post('/rest-api/modules/'+items.idmodule+'/modules_type', data).then(function(res){
          console.log('response : ', res)
        }, function (error) {
          //error
        });
      }
    }
  }
});
