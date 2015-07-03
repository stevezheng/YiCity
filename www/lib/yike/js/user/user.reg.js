(function () {
  'use strict';

  angular
    .module('user.reg', ['user.factory'])
    .controller('$yikeUserRegCtrl', $yikeUserReg);

  $yikeUserReg.$inject = ['$rootScope', '$scope', '$ionicPopup', '$timeout', '$location', '$yikeUser'];

  /* @ngInject */
  function $yikeUserReg($rootScope, $scope, $ionicPopup, $timeout, $location, $yikeUser) {
    /* jshint validthis: true */
    var self = this;

    self.init = init;
    self.title = '$yikeUserReg';

    $scope.user = {};
    //$scope.isSendVerify = false;
    $scope.isReg = false;
    $scope.code = '';
    $scope.verify = verify;
    $scope.isSendCode = false;

    $scope.reg = reg;

    init();

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

    function verify(code) {
      AV.User.verifyMobilePhone(code).then(function(){
        alertPopup('提示', '验证手机号码成功,完成注册');
        $location.path('/tab/home');
      }, function(err){
        //验证失败
        alertPopup('提示', '验证手机号码失败,注册失败');
      });
    }

    function reg(username, password, rPassword) {
      if (!username) {
        alertPopup('提示', '请输入手机号码');
        return false;
      }

      if (username.length !== 11) {
        alertPopup('提示', '手机格式不正确');
        return false;
      }

      if (!password) {
        alertPopup('提示', '请输入密码');
        return false;
      }

      if (!rPassword) {
        alertPopup('提示', '请输入确认密码');
        return false;
      }

      if (rPassword !== password) {
        alertPopup('提示', '两次密码输入不一致');
        return false;
      }

      var user = new AV.User();

      user.set('username', username);
      user.set('password', password);
      user.setMobilePhoneNumber(username);

      user.signUp(null, {
        success: function (user) {
          var popup = alertPopup('提示', '注册成功,请验证手机号码');
          popup.then(function () {
            $location.path('/user-verify');
          });
        },
        error: function (user, err) {
          console.error(err);
          if (err.code === 214) {
            alertPopup('提示', '该用户已注册,请直接登陆');
          } else {
            alertPopup('提示', '注册失败');
          }
        }
      });
    }
  }
})();

