(function () {
  'use strict';

  angular
    .module('address.edit', [])
    .controller('AddressEditCtrl', AddressEditCtrl);

  AddressEditCtrl.$inject = ['$scope', '$state', '$yikeUtils', '$ionicHistory'];

  /* @ngInject */
  function AddressEditCtrl($scope, $state, $yikeUtils, $ionicHistory) {
    var id = $state.params.id;
    $scope.init = init;
    $scope.address = {
      name: null
      , phone: null
      , city: null
    };

    $scope.submit = submit;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      D('Address')
        .where({objectId: id, userId: AV.User.current().id})
        .find()
        .then(function(address) {
          $scope.address.name = address.get('name');
          $scope.address.phone = address.get('phone');
          $scope.address.city = address.get('city');
          $scope.address.address = address.get('address');
        })
    }

    function submit() {
      var address = $scope.address;

      D('Address')
        .where({objectId: id, userId: AV.User.current().id})
        .update(address)
        .then(function() {
          $yikeUtils.alert('提示', '修改地址成功');
          $ionicHistory.goBack();
        })
        .catch(function(address, err) {
          $yikeUtils.alert('提示', '修改地址失败:' + err.message);
        })
    }
  }
})();