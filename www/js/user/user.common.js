(function () {
  'use strict';

  angular
    .module('user.common', [])
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['$scope'];

  /* @ngInject */
  function UserCtrl($scope) {
    $scope.init = init;
    if (AV.User.current()) {
      $scope.cUser = AV.User.current();
    } else {
      $scope.cUser = false;
    }

    init();

    ////////////////

    function init() {
    }
  }
})();