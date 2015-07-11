(function () {
  'use strict';

  angular
    .module('order.list', [])
    .controller('OrderListCtrl', OrderListCtrl);

  OrderListCtrl.$inject = ['$scope', '$yikeUtils'];

  /* @ngInject */
  function OrderListCtrl($scope, $yikeUtils) {
    $scope.init = init;
    $scope.status = 'all';
    $scope.orders = [];
    $scope.orderMap = {
      '-1': '已取消'
      , '0': '待付款'
      , '1': '已付款'
      , '2': '已完成'
    };
    $scope.pay = pay;


    init();

    ////////////////

    function init() {
      query()
    }

    function query() {
      var condition = {
        userId: AV.User.current().id
      };
      D('Order')
        .where(condition)
        .select()
        .then(function(orders) {
          $scope.orders = orders;
          $scope.$digest();
        })
    }

    function pay() {
      $yikeUtils.alert('提示', '暂时无法线上支付，请到店使用现金付款');
    }
  }
})();