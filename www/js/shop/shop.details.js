(function () {
  'use strict';

  angular
    .module('shop.details', [])
    .controller('ShopDetailsCtrl', ShopDetailsCtrl);

  ShopDetailsCtrl.$inject = ['$scope', '$state'];

  /* @ngInject */
  function ShopDetailsCtrl($scope, $state) {
    var shopId = $state.params.shopId;

    $scope.init = init;
    $scope.shop = null;
    $scope.tabStatus = '商品列表';

    init();

    ////////////////

    function init() {
      query(shopId);
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