(function () {
  'use strict';

  angular
    .module('address.manage', [])
    .controller('AddressManageCtrl', AddressManageCtrl);

  AddressManageCtrl.$inject = ['$scope'];

  /* @ngInject */
  function AddressManageCtrl($scope) {
    $scope.init = init;

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
  }
})();