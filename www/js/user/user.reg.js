(function () {
  'use strict';

  angular
    .module('user.reg', [])
    .controller('UserRegCtrl', UserRegCtrl);

  UserRegCtrl.$inject = ['$scope', '$yikeUtils', '$state'];

  /* @ngInject */
  function UserRegCtrl($scope, $yikeUtils, $state) {
    $scope.user = {
      phone: ''
      , password: ''
      , rePassword: ''
      , inviteCode: ''
      , code: ''
    };

    $scope.init = init;
    $scope.reg = reg;
    $scope.submit = submit;

    init();

    ////////////////

    function init() {
    }

    function reg(username, password, rePassword, inviteCode) {
      if (username.length !== 11) {
        $yikeUtils.alert('提示', '请输入正确的手机号码');
        return false;
      }

      if (password !== rePassword) {
        $yikeUtils.alert('提示', '两次密码不一致，请检查后重新输入');
        return false;
      }

      var user = new AV.User();
      user.set("username", username);
      user.set("password", password);
      user.set("inviteCode", inviteCode);
      user.set("levelOne", inviteCode);

      user.setMobilePhoneNumber(username);

      user.signUp(null, {
        success: function(user) {
          $yikeUtils.alert('验证码已发送');
        },
        error: function(user, error) {
          $yikeUtils.alert("Error: " + error.code + " " + error.message);
        }
      });
    }

    function submit(username, password, rePassword, code) {
      if (username.length !== 11) {
        $yikeUtils.alert('提示', '请输入正确的手机号码');
        return false;
      }

      if (password !== rePassword) {
        $yikeUtils.alert('提示', '两次密码不一致，请检查后重新输入');
        return false;
      }

      if (!code) {
        $yikeUtils.alert('提示', '请输入验证码');
        return false;
      }

      AV.User.verifyMobilePhone(code).then(function(){
        $state.go('registered-success');
        //$yikeUtils.alert('验证通过');
      }, function(err){
        $yikeUtils.alert('验证失败');
        //验证失败
      });
    }
  }
})();