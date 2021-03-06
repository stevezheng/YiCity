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
    $scope.toggleAll = toggleAll;
    $scope.optionToggled = optionToggled;
    $scope.isAllSelected = true;
    $scope.editCart = editCart;
    $scope.editCartDone = editCartDone;
    $scope.decCount = decCount;
    $scope.incCount = incCount;

    init();

    ////////////////

    function init() {
      group();
    }

    function group() {
      var g = _.groupBy($scope.items, function(item) {
        item.shopName = item.shop.get('name');
        return item.shop.id;
      });
      console.log(g);
      $scope.groups = g;
      return g;
    }

    function editCart(item) {
      item.editType = true;
    }

    function editCartDone(item) {
      item.editType = false;
    }

    function decCount(item) {
      if (item.count > 0) {
        item.count--;
        $scope.cost = initCost();
      }
    }

    function incCount(item) {
      item.count++;
      $scope.cost = initCost();
    }

    function toggleAll() {
      var toggleStatus = $scope.isAllSelected;
      angular.forEach($scope.items, function(item){ item.selected = toggleStatus; });
      $scope.cost = initCost();
    }

    function optionToggled() {
      $scope.isAllSelected = $scope.items.every(function(item){ return item.selected; });
      $scope.cost = initCost();
    }
    
    function initCost() {
      var items = Cart.all();
      var cost = 0;

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.selected) {
          var price = item.item.get('price');
          var count = item.count;
          cost += Number(price) * Number(count);
        }
      }

      return cost;
    }

    function order() {
      if (AV.User.current()) {
        var data = {};
        data.items = Cart.format($scope.items);
        data.cost = $scope.cost;
        data.userId = AV.User.current().id;
        Cart.setTmpCart(data);
        $state.go('order-submit');
      } else {
        $yikeUtils.alert('提示', '尚未登录，请先登录');
        $yikeUtils.loginModal(LOGIN_TEMPLATE, function() {
          $state.reload();
        });
      }
    }
  }
})();