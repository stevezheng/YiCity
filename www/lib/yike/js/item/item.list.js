(function () {
  'use strict';

  angular
    .module('item.list', [])
    .controller('itemListCtrl', itemListCtrl);

  itemListCtrl.$inject = ['$scope'];

  /* @ngInject */
  function itemListCtrl($scope) {
    $scope.init = init;
    $scope.query = query;

    init();

    ////////////////

    function init() {
    }

    function query() {
      D('item')
        .where({status: 1})
        .select()
        .then(function(res) {
          $scope.items9 = [];
          $scope.items19 = [];
          $scope.items29 = [];

          AV._.each(res, function(r) {
            if (r.price === 9) {
              $scope.items9.push(r);
            } else if (r.price === 19) {
              $scope.items19.push(r);
            } else if (r.price === 29) {
              $scope.items29.push(r);
            }
          });

          $scope.$digest();
        });
    }
  }
})();