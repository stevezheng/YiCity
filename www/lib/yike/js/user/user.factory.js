(function () {
  'use strict';

  angular
    .module('user.factory', [])
    .factory('$yikeUser', $yikeUser);

  $yikeUser.$inject = ['$location'];

  /* @ngInject */
  function $yikeUser($location) {
    return {
      login: login,
      reg: reg,
      permission: permission
    };

    ////////////////

    function login() {

    }

    function reg() {
    }

    function isLogin() {
      var cUser = AV.User.current();
      return cUser ? true : false;
    }


    function permission() {
      var loginFlag = isLogin(); //判断是否登陆
      if (!loginFlag) {
        $location.path('/user-login');
      }
    }
  }
})();