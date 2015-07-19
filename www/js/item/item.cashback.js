(function () {
  'use strict';

  angular
    .module('item.cashBack', [])
    .controller('ItemCashBackCtrl', ItemCashBackCtrl);

  ItemCashBackCtrl.$inject = ['$scope'];

  /* @ngInject */
  function ItemCashBackCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      var CashBack = AV.Object.extend('CashBack');
      var q = new AV.Query(CashBack);
      q.equalTo('status', 1);
      q.include('Item');

      q.find({
        success: function(data) {
          $scope.items = data;
        }
      })
    }
  }
})();