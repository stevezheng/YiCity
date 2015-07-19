(function () {
  'use strict';

  angular
    .module('item', ['item.details',
      'item.list',
      'item.bigsell', 'item.bigsell.details',
      'item.cashBack', 'item.cashBack.details'
    ]);
})();