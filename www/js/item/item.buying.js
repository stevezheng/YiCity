(function () {
  'use strict';

  angular
    .module('item.buying', [])
    .controller('ItemBuyingCtrl', ItemBuyingCtrl);

  ItemBuyingCtrl.$inject = ['$scope', '$yikeUtils'];

  /* @ngInject */
  function ItemBuyingCtrl($scope, $yikeUtils) {
    $scope.init = init;
    $scope.buy = buy;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      var Buying = AV.Object.extend('Buying');
      var q = new AV.Query(Buying);
      q.equalTo('status', 1);
      q.include('Item');

      q.find({
        success: function(data) {
          $scope.items = data;
        }
      })
    }

    function buy() {
      $yikeUtils.alert('提示', '报名成功');
    }
  }
})();