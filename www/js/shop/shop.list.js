(function () {
  'use strict';

  angular
    .module('shop.list', [])
    .controller('ShopListCtrl', ShopListCtrl);

  ShopListCtrl.$inject = ['$scope', '$state', 'Shop'];

  /* @ngInject */
  function ShopListCtrl($scope, $state, Shop) {
    var categoryMap = {
      'meishi': '美食'
      , 'dianying': '电影'
      , 'jiudian': '酒店'
      , 'ktv': 'KTV'
      , 'meirong': '美容'
      , 'dingdangao': '订蛋糕'
      , 'dingwaimai': '订外卖'
      , 'xiuxianyule': '休闲娱乐'
      , 'lvyou': '旅游'
      , 'bendishenghuo': '本地生活'
    };

    $scope.init = init;
    $scope.shops = false;
    $scope.selectType = false;
    $scope.setSelectType = setSelectType;
    $scope.categoryName = '';
    $scope.sortType = 'new';
    $scope.sort = sort;

    init();

    ////////////////

    function init() {
      var categoryName = $state.params.categoryName;
      $scope.categoryName = categoryName;
      query(categoryName);
    }

    function sort(type) {
      $scope.sortType = type;
      query($scope.categoryName, $scope.sortType);
      $scope.selectType = false;
    }

    function setSelectType(selectType) {
      if ($scope.selectType == selectType) {
        $scope.selectType = false;
      } else {
        $scope.selectType = selectType;
      }
    }

    function query(categoryName, order) {
      var _shops = [];
      var condition = {};
      if (categoryName && categoryName != 'all') {
        condition.categoryName = categoryMap[categoryName];
      }
      D('Shop')
        .limit(0, 10)
        .order(order)
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
