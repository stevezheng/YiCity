(function () {
  'use strict';

  angular
    .module('address.factory', [])
    .factory('$yikeAddress', $yikeAddress);

  $yikeAddress.$inject = [''];

  /* @ngInject */
  function $yikeAddress() {
    return {
      add: add
    };

    ////////////////

    function add() {
    }


  }
})();
