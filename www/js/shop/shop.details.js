(function () {
  'use strict';

  angular
    .module('shop.details', [])
    .controller('ShopDetailsCtrl', ShopDetailsCtrl);

  ShopDetailsCtrl.$inject = ['$scope', '$state', '$yikeUtils'];

  /* @ngInject */
  function ShopDetailsCtrl($scope, $state, $yikeUtils) {
    var shopId = $state.params.shopId;

    $scope.init = init;
    $scope.shop = null;
    $scope.tabStatus = '商品列表';
    $scope.collect = collect;

    init();

    ////////////////

    function init() {
      console.log('shop.details');
      query(shopId);
    }

    function collect() {
      $yikeUtils.alert('收藏店铺成功');
    }

    function query(shopId) {
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
          $scope.items = items;
          $scope.$digest();
        })
    }
  }
})();