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

    var cartAddress = null;

    var tmpCart = {};
    return {
      query: query
      , all: all
      , add: add
      , del: del
      , format: format
      , getTmpCart: getTmpCart
      , setTmpCart: setTmpCart
      , setAddress: setAddress
      , getAddress: getAddress
    };

    ////////////////

    function query(where, page, num) {
    }

    function setAddress(address) {
      cartAddress = address;
    }

    function getAddress() {
      return cartAddress;
    }

    function all() {
      return cart;
    }

    function setTmpCart(data) {
      tmpCart = data;
      return true;
    }

    function getTmpCart() {
      return tmpCart;
    }

    function add(item) {
      item.selected = true;
      return cart.push(item);
    }

    function del(item) {
    }

    function format(items) {
      var list = [];
      for (var i = 0; i < items.length; i++) {
        var c = items[i];
        if (c.selected) {
          var data = {};
          data.itemId = c.item.id;
          data.itemName = c.item.get('name');
          data.itemPrice = c.item.get('price');
          data.shopId = c.shop.id;
          data.shopName = c.shop.get('name');
          data.itemCount = c.item.count;
          list.push(data);
        }
      }

      return list;
    }
  }
})();