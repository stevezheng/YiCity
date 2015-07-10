(function () {
  'use strict';

  angular
    .module('order.shopping', [])
    .controller('OrderShoppingCtrl', OrderShoppingCtrl);

  OrderShoppingCtrl.$inject = ['$scope', 'Cart', '$yikeUtils', '$state'];

  /* @ngInject */
  function OrderShoppingCtrl($scope, Cart, $yikeUtils, $state) {
    $scope.init = init;
    $scope.items = Cart.all();
    $scope.cost = initCost();
    $scope.order = order;

    init();

    ////////////////

    function init() {
      console.log(Cart.all());
    }
    
    function initCost() {
      var items = Cart.all();
      var cost = 0;

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var price = item.item.get('price');
        var count = item.count;
        cost += Number(price) * Number(count);
      }

      return cost;
    }

    function order() {
      if (AV.User.current()) {
        var data = {};
        data.items = Cart.format();
        data.cost = $scope.cost;
        data.userId = AV.User.current().id;
        D('Order')
          .add(data)
          .then(function(_order) {
            console.log(_order);
            $yikeUtils.confirm('提示', '现在去支付?')
              .then(function() {
                $state.go('pay({id: '+_order.id+'})');
              })
          })
      } else {
        $yikeUtils.alert('提示', '尚未登录，请先登录');
        $yikeUtils.loginModal(LOGIN_TEMPLATE, function() {
          $state.reload();
        });
      }
    }
  }
})();