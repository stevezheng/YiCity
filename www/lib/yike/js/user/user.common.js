(function () {
  'use strict';

  angular
    .module('user.common', ['user.factory'])
    .controller('$yikeUserCommonCtrl', $yikeUserCommon);

  $yikeUserCommon.$inject = ['$rootScope', '$scope', '$ionicPopup', '$timeout', '$location', '$yikeUser'];

  /* @ngInject */
  function $yikeUserCommon($rootScope, $scope, $ionicPopup, $timeout, $location, $yikeUser) {
    /* jshint validthis: true */
    var self = this;

    self.init = init;
    self.title = '$yikeUserCommon';

    init();


    $scope.user = {};

    ////////////////

    function init() {
      //$yikeUser.permission();
    }
  }
})();
