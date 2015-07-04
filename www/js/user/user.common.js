(function () {
  'use strict';

  angular
    .module('user.common', [])
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['$scope', '$yikeUtils', '$state'];

  /* @ngInject */
  function UserCtrl($scope, $yikeUtils, $state) {
    $scope.init = init;
    $scope.login = login;
    $scope.logout = logout;

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
        $state.reload();
      });
    }

    function logout() {
      $yikeUtils.confirm('提示', '是否确认退出?')
        .then(function(res) {
          if (res) {
            AV.User.logOut();
            $state.reload();
          }
        });
    }
  }
})();