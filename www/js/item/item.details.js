(function () {
  'use strict';

  angular
    .module('item.details', [])
    .controller('ItemDetailsCtrl', ItemDetailsCtrl);

  ItemDetailsCtrl.$inject = ['$scope', '$state'];

  /* @ngInject */
  function ItemDetailsCtrl($scope, $state) {
    var itemId = $state.params.itemId;
    $scope.init = init;
    $scope.item = null;
    $scope.shop = null;

    init();

    ////////////////

    function init() {
      query(itemId);
    }

    function query() {
      D('Item')
        .where({objectId: itemId})
        .find()
        .then(function(item) {
          $scope.item =item;
          D('Shop')
            .where({objectId: item.get('shopId')})
            .find()
            .then(function(shop) {
              $scope.shop = shop;
            });
        });
    }
  }
})();