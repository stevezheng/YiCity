(function () {
  'use strict';

  angular
    .module('item.bigsell.details', [])
    .controller('ItemBigsellDetailsCtrl', ItemBigsellDetailsCtrl);

  ItemBigsellDetailsCtrl.$inject = ['$scope', '$state', 'Cart'];

  /* @ngInject */
  function ItemBigsellDetailsCtrl($scope, $state, Cart) {
    var id = $state.params.id;
    $scope.init = init;
    $scope.item = null;
    $scope.buy = buy;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      D('FlashSale')
        .where({'objectId': id})
        .include('Item')
        .find()
        .then(function(data) {
          $scope.item = data;
          return D('Shop')
            .where({objectId: data.get('Item').get('shopId')})
            .find()
        })
        .then(function(shop) {
          $scope.shop = shop;
          $scope.$digest();
        })
        .catch(function(err) {
          console.error(err);
        })
    }

    function buy() {
      var item = $scope.item.get('Item');
      item.set('price', $scope.item.get('discountPrice'));
      var cart = {
        item: item
        , shop: $scope.shop
        , count: 1
      };

      Cart.add(cart);

      $state.go('shopping-cart');
    }
  }
})();