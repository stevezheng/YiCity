angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

  .controller('HomeCtrl', function($scope, $stateParams, GPS) {
    $scope.city = GPS.getCity();
    D('Item')
      .limit(0,5)
      .select()
      .then(function(items) {
        $scope.items = items;
      })
  })

.controller('AccountCtrl', function($scope) {
})

.controller('MoreCtrl', function($scope, $yikeUtils) {
    $scope.update = function() {
      $yikeUtils.alert('提示', '已经是最新版本了');
    };

    $scope.clear = function() {
      $yikeUtils.alert('提示', '清除缓存成功');
    };

    $scope.feedback = function() {
      $yikeUtils.alert('提示', '请拨打电话0592-55889966');
    }
});
