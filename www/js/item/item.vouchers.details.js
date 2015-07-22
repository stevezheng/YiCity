(function () {
  'use strict';

  angular
    .module('item.vouchers.details', [])
    .controller('ItemVouchersDetailsCtrl', ItemVouchersDetailsCtrl);

  ItemVouchersDetailsCtrl.$inject = ['$scope', '$state', 'Cart', '$yikeUtils'];

  /* @ngInject */
  function ItemVouchersDetailsCtrl($scope, $state, Cart, $yikeUtils) {
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
      D('Vouchers')
        .where({'objectId': id})
        .include('Shop')
        .find()
        .then(function(data) {
          $scope.item = data;
          return D('Shop')
            .where({objectId: data.get('shopId')})
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
      $yikeUtils.alert('提示', '领取成功');
    }
  }
})();