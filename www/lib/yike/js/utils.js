(function () {
  'use strict';

  angular
    .module('yike.utils', ['ionic'])
    .factory('$yikeUtils', $yikeUtils);

  $yikeUtils.$inject = ['$rootScope', '$state', '$ionicPopup', '$ionicModal'];

  /* @ngInject */
  function $yikeUtils($rootScope, $state, $ionicPopup, $ionicModal) {
    return {
      go: go
      , alert: alert
      , confirm: confirm
      , show: show
      , loginModal: loginModal
    };

    ////////////////

    function go(target, params, options) {
      $state.go(target, params, options);
    }

    function alert(title, template) {
      return $ionicPopup.alert({
        title: title,
        template: template,
        okType: 'button-balanced'
      });
    }

    function confirm(title, template) {
      return $ionicPopup.confirm({
        'title': title
        , 'template': template
        , 'okType': 'button-balanced'
      });
    }

    function show(title, template, scope, buttons) {
      return $ionicPopup.show({
        title: title
        , template: template
        , scope: scope
        , buttons: buttons
      });
    }

    function loginModal(template, cb) {
      // Create the login modal that we will use later
      //$ionicModal.fromTemplateUrl('templates/login.html', {
      $ionicModal.fromTemplateUrl(template, {
        scope: $rootScope
      }).then(function (modal) {
        $rootScope.modal = modal;
        $rootScope.modal.show();
      });

      // Triggered in the login modal to close it
      $rootScope.closeLogin = function () {
        $rootScope.modal.hide();
      };

      // Open the login modal
      $rootScope.login = function () {
        $rootScope.modal.show();
      };

      $rootScope.reg = function(path) {
        $rootScope.modal.hide();
        $state.go(path);
      };

      // Perform the login action when the user submits the login form
      $rootScope.doLogin = function (username, password) {
        if (!username) {
          alert('提示', '请输入用户名');
          return false;
        }

        if (!password) {
          alert('提示', '请输入密码');
          return false;
        }

        AV.User.logIn(username, password, {
          success: function (user) {
            if (user.get('mobilePhoneVerified')) {
              var popup = alert('提示', '登录成功');
              popup.then(function () {
                $rootScope.closeLogin();
                //$location.path('/tab/home');
              });
              $rootScope.cUser = user;
              if (cb) {
                cb();
              }
            } else {
              var popup1 = alert('提示', '请验证手机号码');
              popup1.then(function () {
                $location.path('/user-verify');
              });
            }
          },
          error: function (user, err) {
            console.error(err);
            if (err.code === 211) {
              alert('提示', '该手机号未注册');
            } else {
              alert('提示', '账号密码错误');
            }
          }
        });
      }
    }
  }
})();
