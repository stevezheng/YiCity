(function () {
  'use strict';

  angular
    .module('shop.list', [])
    .controller('ShopListCtrl', ShopListCtrl);

  ShopListCtrl.$inject = ['$scope', '$state', '$ionicLoading', 'Shop'];

  /* @ngInject */
  function ShopListCtrl($scope, $state, $ionicLoading, Shop) {
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
    $scope.shops = [];
    $scope.selectType = false;
    $scope.setSelectType = setSelectType;
    $scope.categoryName = '';
    $scope.sortType = 'new';
    $scope.sort = sort;

    var page = 0;
    var row = 10;
    var count = 100;

    init();

    ////////////////

    $scope.doRefresh = function() {
      page = 0;
      row = 7;
      $scope.noMoreItemsAvailable = false;
      $scope.items = undefined;

      Shop.getFeeds(page, row).then(function(res) {
        $scope.items = res;

        $scope.$broadcast('scroll.refreshComplete');
      })
    };

    $scope.noMoreItemsAvailable = false;

    $scope.loadMore = function() {
      if ( row * page > count) {
        $scope.noMoreItemsAvailable = true;
      } else {
        var categoryName = $state.params.categoryName;
        query(categoryName, null, page, row);
        page++;
        row++;
      }
    };

    function init() {
      var categoryName = $state.params.categoryName;
      $scope.categoryName = categoryName;
      //query(categoryName, null, page, row);
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

    function query(categoryName, order, page, row) {
      page = page || 0;
      row = row || 10;
      $ionicLoading.show({template: '<ion-spinner></ion-spinner>', duration: 5000});
      var _shops = [];
      var condition = {};
      if (categoryName && categoryName != 'all') {
        condition.categoryName = categoryMap[categoryName];
      }
      return D('Shop')
        .limit(page, row)
        .order(order)
        .where(condition)
        .select()
        .then(function(shops) {
          _shops = shops;
          return Promise.all(_.each(_shops, function(shop) {
            return D('Item')
              .where({shopId: shop.id})
              .limit(page, row)
              .select()
              .then(function(items) {
                if (items.length > 0) {
                  shop.items = items;
                  $scope.$digest();
                }
              });
          }))
        })
        .then(function() {
          $scope.shops = $scope.shops.concat(_shops);
          $scope.$digest();
          $ionicLoading.hide();
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }
  }
})();
