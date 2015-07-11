(function () {
  'use strict';

  angular
    .module('account.collect', [])
    .controller('AccountCollectCtrl', AccountCollectCtrl);

  AccountCollectCtrl.$inject = ['$scope'];

  /* @ngInject */
  function AccountCollectCtrl($scope) {
    $scope.init = init;
    $scope.type = 'item';
    $scope.setType = setType;

    init();

    ////////////////

    function init() {
    }

    function query() {

    }

    function setType(type) {
      $scope.type = type;
    }
  }
})();