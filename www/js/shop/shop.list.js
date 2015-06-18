(function () {
  'use strict';

  angular
    .module('shop.list', [])
    .controller('ShopListCtrl', ShopListCtrl);

  ShopListCtrl.$inject = ['$scope', 'Shop'];

  /* @ngInject */
  function ShopListCtrl($scope, Shop) {
    $scope.init = init;
    $scope.data = [];

    init();

    ////////////////

    function init() {
    }
  }
})();
