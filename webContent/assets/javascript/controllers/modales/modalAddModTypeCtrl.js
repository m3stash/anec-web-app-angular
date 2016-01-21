angular.module('webapp').controller('modalAddModTypeCtrl', function ($scope, $uibModalInstance, items, $http) {
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
