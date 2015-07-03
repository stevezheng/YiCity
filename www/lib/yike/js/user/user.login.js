(function () {
  'use strict';

  angular
    .module('user.login', ['user.factory'])
    .controller('$yikeUserLoginCtrl', $yikeUserLogin);

  $yikeUserLogin.$inject = ['$rootScope', '$scope', '$ionicPopup', '$timeout', '$location', '$yikeUser'];

  /* @ngInject */
  function $yikeUserLogin($rootScope, $scope, $ionicPopup, $timeout, $location, $yikeUser) {
    /* jshint validthis: true */
    var self = this;

    self.init = init;
    self.title = '$yikeUserLogin';

    init();

    $scope.user = {};

    $scope.login = login;

    ////////////////

    function init() {
    }

    /**
     * alert
     * @param title
     * @param template
     * @returns {Object|*}
     */
    function alertPopup(title, template) {
      return $ionicPopup.alert({
        title: title,
        template: template,
        okType: 'button-balanced'
      });
    }

    function login(username, password) {
      if (!username) {
        alertPopup('提示', '请输入用户名');
        return false;
      }

      if (!password) {
        alertPopup('提示', '请输入密码');
        return false;
      }

      AV.User.logIn(username, password, {
        success: function (user) {
          if (user.get('mobilePhoneVerified')) {
            var popup = alertPopup('提示', '登录成功');
            popup.then(function () {
              $location.path('/tab/home');
            });
            $rootScope.cUser = user;
          } else {
            var popup1 = alertPopup('提示', '请验证手机号码');
            popup1.then(function () {
              $location.path('/user-verify');
            });
          }
        },
        error: function (user, err) {
          console.error(err);
          if (err.code === 211) {
            alertPopup('提示', '该手机号未注册');
          } else {
            alertPopup('提示', '账号密码错误');
          }
        }
      });
    }

  }
})();
