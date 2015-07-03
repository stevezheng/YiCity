(function () {
  'use strict';

  angular
    .module('user.verify', ['user.factory'])
    .controller('$yikeUserVerifyCtrl', $yikeUserVerify);

  $yikeUserVerify.$inject = ['$rootScope', '$scope', '$ionicPopup', '$timeout', '$location', '$yikeUser'];

  /* @ngInject */
  function $yikeUserVerify($rootScope, $scope, $ionicPopup, $timeout, $location, $yikeUser) {
    /* jshint validthis: true */
    $scope.code = '';
    $scope.verify = verify;
    $scope.isSendCode = false;
    $scope.sendCode = sendCode;


    init();

    ////////////////

    function init() {
      if (AV.User.current()) {
        sendCode();
      }

      $timeout(function() {
        $scope.isSendCode = true;
      }, 60000);
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

    function sendCode() {
      AV.User.requestMobilePhoneVerify(AV.User.current().get('username')).then(function(){
        alertPopup('提示', '验证码已发送');
      }, function(err){
        //发送失败
        alertPopup('提示', '验证码发送失败');
      });
    }
  }
})();

