(function () {
  'use strict';

  angular
    .module('item.list', [])
    .controller('ItemListCtrl', ItemListCtrl);

  ItemListCtrl.$inject = ['$scope'];

  /* @ngInject */
  function ItemListCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();