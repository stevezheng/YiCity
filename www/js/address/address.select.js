(function () {
  'use strict';

  angular
    .module('address.select', [])
    .controller('AddressSelectCtrl', AddressSelectCtrl);

  AddressSelectCtrl.$inject = ['$scope', 'Cart', '$yikeUtils', '$state'];

  /* @ngInject */
  function AddressSelectCtrl($scope, Cart, $yikeUtils, $state) {
    $scope.init = init;
    $scope.setAddress = setAddress;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      D('Address')
        .where({userId: AV.User.current().id})
        .select()
        .then(function(addresses) {
          $scope.addresses = addresses;
        })
    }

    function setAddress(address) {
      Cart.setAddress(address);
      $yikeUtils.alert('提示', '选择地址成功');
      $state.go('order-submit');
    }
  }
})();