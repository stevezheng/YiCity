(function () {
  'use strict';

  angular
    .module('item.buying', [])
    .controller('ItemBuyingCtrl', ItemBuyingCtrl);

  ItemBuyingCtrl.$inject = ['$scope'];

  /* @ngInject */
  function ItemBuyingCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      var Buying = AV.Object.extend('Buying');
      var q = new AV.Query(Buying);
      q.equalTo('status', 1);
      q.include('Shop');

      q.find({
        success: function(data) {
          $scope.items = data;
        }
      })
    }
  }
})();