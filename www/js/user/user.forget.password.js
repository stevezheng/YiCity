(function () {
  'use strict';

  angular
    .module('user.forget.password', [])
    .controller('UserForgetPasswordCtrl', UserForgetPasswordCtrl);

  UserForgetPasswordCtrl.$inject = ['$scope', '$yikeUtils', '$state'];

  /* @ngInject */
  function UserForgetPasswordCtrl($scope, $yikeUtils, $state) {
    $scope.init = init;
    $scope.forget = forget;
    $scope.submit = submit;
    $scope.info = {
      phone: ''
      , code: ''
      , password: ''
    };

    init();

    ////////////////

    function init() {
    }

    function forget(phone) {
      if (!phone) {
        $yikeUtils.alert('请输入手机号码');
        return false;
      }

      if (phone.length !== 11) {
        $yikeUtils.alert('请输入正确的手机号码');
        return false;
      }
      AV.Cloud.requestSmsCode(phone).then(function () {
        $yikeUtils.alert('提示', '验证码发送成功');
      }, function (err) {
        if (err.code === 601) {
          $yikeUtils.alert('提示', err.error);
          return false;
        }

        $yikeUtils.alert('提示', '验证码发送失败,请检查手机号码是否正确');
      });
    }

    function submit(phone, code, password) {
      if (!phone) {
        $yikeUtils.alert('请输入手机号码');
        return false;
      }

      if (phone.length !== 11) {
        $yikeUtils.alert('请输入正确的手机号码');
        return false;
      }

      if (!code) {
        $yikeUtils.alert('请输入验证码');
        return false;
      }

      if (!password) {
        $yikeUtils.alert('请输入重置密码');
        return false;
      }

      var user = new AV.User();
      user.signUpOrlogInWithMobilePhone({
          mobilePhoneNumber: phone,
          smsCode: code
        },
        {
          success: function (user) {
            user.setPassword(password);
            user.save().then(function() {
              $yikeUtils.alert('提示', '密码修改成功');
              $state.go('tab.home');
            })
          },
          error: function (err) {
            $yikeUtils.alert('提示', '密码修改失败');
          }
        });
    }
  }
})();