(function () {
  'use strict';

  angular
    .module('item.buying.details', [])
    .controller('ItemBuyingDetailsCtrl', ItemBuyingDetailsCtrl);

  ItemBuyingDetailsCtrl.$inject = ['$scope', '$state', 'Cart', '$yikeUtils'];

  /* @ngInject */
  function ItemBuyingDetailsCtrl($scope, $state, Cart, $yikeUtils) {
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
      D('Buying')
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
      $yikeUtils.alert('提示', '报名成功');
    }
  }
})();