(function () {
  'use strict';

  angular
    .module('item.bigsell', [])
    .controller('ItemBigsellCtrl', ItemBigsellCtrl);

  ItemBigsellCtrl.$inject = ['$scope'];

  /* @ngInject */
  function ItemBigsellCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      var FlashSale = AV.Object.extend('FlashSale');
      var q = new AV.Query(FlashSale);
      q.equalTo('status', 1);
      q.include('Item');

      q.find({
        success: function(data) {
          $scope.items = data;
        }
      })
    }
  }
})();