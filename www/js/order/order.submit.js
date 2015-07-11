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
    $scope.radios = {
      pay: 0,
      method: 0
    };

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
      if ($scope.radios.pay == 1) {
        $yikeUtils.alert('提示', '在线支付功能即将到来');
      } else {
        D('Order')
          .where({objectId: $scope.orderId})
          .find()
          .then(function(order) {
            order.set('payMethod', $scope.radios.pay);
            order.set('useMethod', $scope.radios.method);
            order.set('voucherId', '');
            order.save();
          })
          .then(function() {
            $yikeUtils.alert('提示', '订单提交成功')
          })
      }
    }
  }
})();