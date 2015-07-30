(function () {
  'use strict';

  angular
    .module('shop.details', [])
    .controller('ShopDetailsCtrl', ShopDetailsCtrl);

  ShopDetailsCtrl.$inject = ['$scope', '$state', '$yikeUtils', '$ionicLoading', 'Cart'];

  /* @ngInject */
  function ShopDetailsCtrl($scope, $state, $yikeUtils, $ionicLoading, Cart) {
    var shopId = $state.params.shopId;

    $scope.init = init;
    $scope.shop = null;
    $scope.tabStatus = '商品列表';
    $scope.collect = collect;
    $scope.minus = minus;
    $scope.add = add;
    $scope.buy = buy;
    $scope.openImage = openImage;
    $scope.totalCount = 0;
    $scope.popup = null;
    $scope.closePopup = closePopup;

    init();

    ////////////////

    function init() {
      query(shopId);
    }

    function openImage(image) {
      console.log(image);
      $scope.popup = $yikeUtils.show('<i class="pull-right" ng-click="closePopup()">X</i>', '<img src="' + image + '" width="100%">')
    }

    function closePopup() {
      $scope.popup.close();
    }

    function buy() {
      if ($scope.totalCount > 0) {
        for (var i = 0; i < $scope.items.length; i++) {
          var item = $scope.items[i];
          if (item.count > 0) {
            var cart = {
              item: item
              , shop: $scope.shop
              , count: item.count
            };

            Cart.add(cart);
          }
        }

        $state.go('shopping-cart');
      } else {
        $yikeUtils.alert('提示', '请先选择购买数量');
      }
    }

    function minus(item) {
      if (item.count > 0) {
        item.count--;
        $scope.totalCount--;
      }
    }

    function add(item) {
      item.count++;
      $scope.totalCount++;
    }

    function collect() {
      $yikeUtils.alert('收藏店铺成功');
    }

    function query(shopId) {
      $ionicLoading.show({template: '<ion-spinner></ion-spinner>', duration: 5000});
      D('Shop')
        .where({objectId: shopId})
        .find()
        .then(function(shop) {
          $scope.shop = shop;
          $scope.$digest();
        });

      D('Item')
        .where({shopId: shopId})
        .select()
        .then(function(items) {
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.count = 0;
          }
          $scope.items = items;
          $scope.$digest();
          $ionicLoading.hide();
        })
    }
  }
})();