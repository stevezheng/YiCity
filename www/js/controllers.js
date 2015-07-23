angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    }
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('HomeCtrl', function ($scope, $stateParams, GPS) {
    //var opt = {
    //  'data' : {
    //    'content' : {
    //      'text' : '要分享的内容', //要分享的文字
    //    }
    //  }
    //};
    //$('#umshare').umshare(opt);
    //
    //$scope.share = function() {
    //  $('#umshare').umshare(opt);
    //};

    $scope.city = GPS.getCity();
    D('Item')
      .limit(0, 5)
      .select()
      .then(function (items) {
        $scope.items = items;
      })
  })

  .factory('Search', function() {
    var item = '';
    return {
      getItem: function() {
        return item;
      },

      setItem: function(_item) {
        item = _item;
      }
    }
  })

  .controller('SearchCtrl', function ($scope, Search) {
    $scope.search = {
      shop: ''
      , item: Search.getItem()
    };
    $scope.data = {
      items: null
      , shops: null
    };

    $scope.searchItem = function() {
      Search.setItem($scope.search.item);
      var query = 'select * from Item where name like "' + $scope.search.item + '%"';
      AV.Query.doCloudQuery(query, {
        success: function (result) {
          $scope.data.items = result.results;
          $scope.$digest();
        },
        error: function (error) {
          console.dir(error);
        }
      });
    };

    $scope.searchShop = function() {
      Search.setItem($scope.search.item);
      var query = 'select * from Shop where name like "'+$scope.search.item +'%"';
      AV.Query.doCloudQuery(query, {
        success: function(result){
          $scope.data.shops = result.results;
          $scope.$digest();
        },
        error: function(error){
          console.dir(error);
        }
      });
    };

    if ($scope.search.item != '') {
      $scope.searchItem();
      $scope.searchShop();
    }

  })

  .controller('AccountCtrl', function ($scope) {
  })

  .controller('MoreCtrl', function ($scope, $yikeUtils) {
    $scope.update = function () {
      $yikeUtils.alert('提示', '已经是最新版本了');
    };

    $scope.clear = function () {
      $yikeUtils.alert('提示', '清除缓存成功');
    };

    $scope.feedback = function () {
      $yikeUtils.alert('提示', '请拨打电话0592-55889966');
    }
  });
