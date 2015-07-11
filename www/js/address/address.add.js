(function () {
  'use strict';

  angular
    .module('address.add', [])
    .controller('AddressAddCtrl', AddressAddCtrl);

  AddressAddCtrl.$inject = ['$scope', '$ionicHistory', '$yikeUtils'];

  /* @ngInject */
  function AddressAddCtrl($scope, $ionicHistory, $yikeUtils) {
    $scope.init = init;
    $scope.address = {
      name: null
      , phone: null
      , city: null
      , content: null
    };

    $scope.submit = submit;

    init();

    ////////////////

    function init() {
    }

    function submit() {
      var address = $scope.address;
      address.userId = AV.User.current().id;
      address.username = AV.User.current().get('username');
      address.isDefault = 0;

      D('Address')
        .add(address)
        .then(function(address) {
          $yikeUtils.alert('提示', '添加地址成功');
          $ionicHistory.goBack();
        })
        .catch(function(address, err) {
          $yikeUtils.alert('提示', '添加地址失败:' + err.message);
        })
    }
  }
})();