angular.module('webapp').controller('modalMgtUsersCtrl', function ($scope, $uibModalInstance, items, $http, notify, glbFac, Modules_type) {
  $scope.formObj = {};
  $scope.type = items.actionType;
  if(items.actionType === 'update') {
    $scope.formObj.type = items.rows[0].name;
  }
  $scope.listTelCode = [{"value":"Français","id": "+33"},{"value":"Belgique","id": "+32"}]
  $scope.listTelCode2 = $scope.listTelCode;
  $scope.listTelCode3 = $scope.listTelCode;

  $scope.listTelCodeFn = function(id){
    console.log('ici',$scope.formObj)
    $scope.listTelCodeId = id;
  }
  $scope.listTelCode2Fn = function(id){
    $scope.listTelCodeId2 = id;
  }
  $scope.listTelCode3Fn = function(id){
    $scope.listTelCodeId3 = id;
  }
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.submit = function(formValid){
    if(formValid){
      //CREATE
      if(items.actionType === 'create'){
        // var data = {};
        // data.name = $scope.formObj.type;
        // Modules_type.create({ idModule: items.idModule}, data, function(res) {
        //   $uibModalInstance.close('save');
        //   notify({message : glbFac._i('notify.success.create'), duration: 2000});
        // }, function(err) {
        //   if(err.data === 'ERR_MDT_ADD_01'){
        //     notify({message : glbFac._i('notify.err_serv.ERR_MDT_ADD_01'), duration: 2000});
        //   }else{
        //     notify({message : glbFac._i('notify.err_serv.create'), duration: 2000});
        //     $uibModalInstance.close();
        //   }
        // });
      //UPDATE
      }else if(items.actionType === 'update'){
        // var data = {};
        // data.name = $scope.formObj.type;
        // Modules_type.update({ idModule: items.idModule, idModuleType: items.rows[0]._id }, data, function(res) {
        //   $uibModalInstance.close('save');
        //   notify({message : glbFac._i('notify.success.update'), duration: 2000});
        // }, function(err) {
        //   if(err.data === 'ERR_MDT_ADD_01'){
        //     notify({message : glbFac._i('notify.err_serv.ERR_MDT_ADD_01'), duration: 2000});
        //   }else{
        //     notify({message : glbFac._i('notify.err_serv.update'), duration: 2000});
        //     $uibModalInstance.close();
        //   }
        // });
        //DELETE
    }else if(items.actionType === 'delete'){
        // var data = {};
        // var listIds = [];
        // for(var i = 0; i< items.rows.length; i++){
        //   listIds.push(items.rows[i]._id);
        // };
        // data.list = listIds;
        // $http({
        //   method: "delete",
        //   url: '/rest-api/modules/'+items.idModule+'/modules_type',
        //   data: listIds
        // }).then(function(res){
        //   $uibModalInstance.close('save');
        //   notify({message : glbFac._i('notify.success.delete'), duration: 2000});
        // }, function (error) {
        //   notify({message : glbFac._i('notify.err_serv.delete'), duration: 2000});
        //   $uibModalInstance.close();
        // });
      }
    }
  }
});
