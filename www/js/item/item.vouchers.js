(function () {
  'use strict';

  angular
    .module('item.vouchers', [])
    .controller('ItemVouchersCtrl', ItemVouchersCtrl);

  ItemVouchersCtrl.$inject = ['$scope', '$yikeUtils'];

  /* @ngInject */
  function ItemVouchersCtrl($scope, $yikeUtils) {
    $scope.init = init;
    $scope.buy = buy;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      var Vouchers = AV.Object.extend('Vouchers');
      var q = new AV.Query(Vouchers);
      q.equalTo('status', 1);
      q.include('Shop');

      q.find({
        success: function(data) {
          $scope.items = data;
        }
      })
    }

    function buy() {
      $yikeUtils.alert('提示', '领取成功');
    }
  }
})();