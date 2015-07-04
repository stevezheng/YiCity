(function () {
  'use strict';

  angular
    .module('user.common', [])
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['$scope', '$yikeUtils'];

  /* @ngInject */
  function UserCtrl($scope, $yikeUtils) {
    $scope.init = init;
    $scope.login = login;

    if (AV.User.current()) {
      $scope.cUser = AV.User.current();
    } else {
      $scope.cUser = false;
    }

    init();

    ////////////////

    function init() {
    }

    function login() {
      $yikeUtils.loginModal(LOGIN_TEMPLATE, function() {
        init();
      });
    }
  }
})();