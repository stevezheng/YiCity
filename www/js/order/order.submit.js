(function () {
  'use strict';

  angular
    .module('order.submit', [])
    .controller('OrderSubmitCtrl', OrderSubmitCtrl);

  OrderSubmitCtrl.$inject = ['$scope', '$state', '$yikeUtils'];

  /* @ngInject */
  function OrderSubmitCtrl($scope, $state, $yikeUtils) {
    $scope.init = init;
    $scope.orderId = $state.params.orderId;
    $scope.addresses = [];
    $scope.submit = submit;
    $scope.setPay = setPay;
    $scope.setMethod = setMethod;
    $scope.pay = 'ziti';
    $scope.method = 'online';

    init();

    ////////////////

    function init() {
      addresses();
    }

    function setPay(type) {
      $scope.pay = type;
    }
    function setMethod(type) {
      $scope.method = type;
    }

    function addresses() {
      D('Address')
        .where({userId: AV.User.current().id})
        .select()
        .then(function(addresses) {
          $scope.addresses = addresses;
          $scope.$digest();
        })
    }

    function submit() {
      $yikeUtils.alert('提示', '该功能将于明天开放');
    }
  }
})();