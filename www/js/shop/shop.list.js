(function () {
  'use strict';

  angular
    .module('shop.list', [])
    .controller('ShopListCtrl', ShopListCtrl);

  ShopListCtrl.$inject = ['$scope', '$state', 'Shop'];

  /* @ngInject */
  function ShopListCtrl($scope, $state, Shop) {
    $scope.init = init;
    $scope.shops = null;
    $scope.selectType = false;
    $scope.setSelectType = setSelectType;

    init();

    ////////////////

    function init() {
      var categoryId = $state.params.categoryId;
      query(categoryId);
    }

    function setSelectType(selectType) {
      if ($scope.selectType == selectType) {
        $scope.selectType = false;
      } else {
        $scope.selectType = selectType;
      }
    }

    function query(categoryId) {
      var _shops = [];
      var condition = {};
      if (categoryId) {
        condition.categoryId = categoryId;
      }
      D('Shop')
        .where(condition)
        .select()
        .then(function(shops) {
          _shops = shops;
          return Promise.all(_.each(_shops, function(shop) {
            return D('Item')
              .where({shopId: shop.id})
              .limit(0, 3)
              .select()
              .then(function(items) {
                if (items.length > 0) {
                  shop.items = items;
                  $scope.shops = _shops;
                  $scope.$digest();
                }
              });
          }))
        })
        .then(function() {
          $scope.shops = _shops;
          $scope.$digest();
        })
    }
  }
})();
