angular.module('webapp').controller('modalDeleteCtrl', function ($scope, $uibModalInstance, $http) {
  $scope.formObj = {};
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.valid = function () {
    $uibModalInstance.close();
  };
});
