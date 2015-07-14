(function () {
  'use strict';

  angular
    .module('user.edit', [])
    .controller('UserEditCtrl', UserEditCtrl);

  UserEditCtrl.$inject = ['$scope', '$state', '$yikeUtils', '$ionicHistory'];

  /* @ngInject */
  function UserEditCtrl($scope, $state, $yikeUtils, $ionicHistory) {
    $scope.type = $state.params.type || 'none';
    $scope.init = init;
    $scope.cUser = {};
    $scope.submit = submit;

    init();

    ////////////////

    function init() {
      $scope.cUser = AV.User.current();
      $scope.info = {
        phone: $scope.cUser.get('mobilePhoneNumber')
        , email: $scope.cUser.get('email')
        , sex: $scope.cUser.get('sex')
        , birthday: $scope.cUser.get('birthday')
      };
    }

    function submit() {
      if ($scope.type == 'phone') {
        $scope.cUser.set('mobilePhoneNumber', $scope.info.phone);
        $scope.cUser.save(null, {
          success: function() {
            $yikeUtils.alert('提示', '修改成功');
            $scope.cUser = AV.User.current();
            $ionicHistory.goBack();
          },
          error: function(res, error) {
          }
        });
      }

      if ($scope.type == 'email') {
        $scope.cUser.set('email', $scope.info.email);
        $scope.cUser.save(null, {
          success: function() {
            $yikeUtils.alert('提示', '修改成功');
            $scope.cUser = AV.User.current();
            $ionicHistory.goBack();
          },
          error: function(res, error) {
          }
        });
      }

      if ($scope.type == 'sex') {
        $scope.cUser.set('sex', $scope.info.sex);
        $scope.cUser.save(null, {
          success: function() {
            $yikeUtils.alert('提示', '修改成功');
            $scope.cUser = AV.User.current();
            $ionicHistory.goBack();
          },
          error: function(res, error) {
          }
        });
      }

      if ($scope.type == 'birthday') {
        $scope.cUser.set('birthday', $scope.info.birthday);
        $scope.cUser.save(null, {
          success: function() {
            $yikeUtils.alert('提示', '修改成功');
            $scope.cUser = AV.User.current();
            $ionicHistory.goBack();
          },
          error: function(res, error) {
          }
        });
      }

      if ($scope.type == 'password') {
        if ($scope.info.newPassword != $scope.info.reNewPassword) {
          $yikeUtils.alert('提示', '两次密码不一样');
          return false;
        }
        $scope.cUser.updatePassword($scope.info.password, $scope.info.newPassword,{
          success: function(){
            $yikeUtils.alert('提示', '修改成功');
            $scope.cUser = AV.User.current();
            $ionicHistory.goBack();
          },
          error: function(err){
            console.dir(err);
          }
        });
      }
    }
  }
})();