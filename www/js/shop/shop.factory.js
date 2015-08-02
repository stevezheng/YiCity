(function () {
  'use strict';

  angular
    .module('shop.factory', ['ionic'])
    .factory('Shop', Factory);

  Factory.$inject = ['$ionicLoading'];

  /* @ngInject */
  function Factory($ionicLoading) {
    var Shop = AV.Object.extend('Shop', {
    }, {
      getCount: function() {
        var query = new AV.Query(S);
        return query.count();
      },
      getFeeds: function(condition, page, row) {
        $ionicLoading.show({
          template: '载入中...'
        });

        var query = new AV.Query(Shop);
        query.skip(page * row);
        query.limit(row);
        var collection = query.collection();

        return collection.fetch().then(function(res) {
          $ionicLoading.hide();
          return res;
        });
      }
    });

    return Shop;
  }
})();
