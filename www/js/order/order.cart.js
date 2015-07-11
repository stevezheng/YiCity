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
      , format: format
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

    function format() {
      var list = [];
      for (var i = 0; i < cart.length; i++) {
        var c = cart[i];
        var data = {};
        data.itemId = c.item.id;
        data.itemName = c.item.get('name');
        data.itemPrice = c.item.get('price');
        data.shopId = c.shop.id;
        data.shopName = c.shop.get('name');
        list.push(data);
      }

      return list;
    }
  }
})();