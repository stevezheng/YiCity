(function () {
  'use strict';

  angular
    .module('order.cart', [])
    .factory('Cart', Cart);


  /* @ngInject */
  function Cart() {
    var cart = [
      //示例
      //{
      //  'name': '商品名称'
      //  , 'count': '商品数量'
      //}
    ];
    return {
      query: query
      , all: all
      , add: add
      , del: del
    };

    ////////////////

    function query(where, page, num) {
    }

    function all() {
      return cart;
    }

    function add(item) {
      return cart.push(item);
    }

    function del(item) {
    }
  }
})();