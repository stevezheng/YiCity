(function () {
  'use strict';

  angular
    .module('gps.list', [])
    .controller('GPSListCtrl', GPSListCtrl);

  GPSListCtrl.$inject = ['$scope', '$location', '$anchorScroll', 'GPS'];

  /* @ngInject */
  function GPSListCtrl($scope, $location, $anchorScroll, GPS) {
    $scope.init = init;
    $scope.data = [];
    $scope.goto = goto;

    init();

    ////////////////

    function init() {
    }

    function goto(id) {
      $location.hash(id);
      $anchorScroll();
    }
  }
})();
