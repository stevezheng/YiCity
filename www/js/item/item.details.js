(function () {
  'use strict';

  angular
    .module('item.details', [])
    .controller('ItemDetailsCtrl', ItemDetailsCtrl);

  ItemDetailsCtrl.$inject = ['$scope', '$state', '$ionicModal', 'Cart'];

  /* @ngInject */
  function ItemDetailsCtrl($scope, $state, $ionicModal, Cart) {
    var itemId = $state.params.itemId;
    $scope.init = init;
    $scope.item = null;
    $scope.shop = null;
    $scope.joinCart = joinCart;
    $scope.joinBuy = joinBuy;
    $scope.buyModal = null;
    $scope.cartModal = null;

    $scope.count = {
      buy: 0,
      cart: 0
    };

    $scope.incCount = incCount;
    $scope.decCount = decCount;

    $scope.cart = cart;
    $scope.buy = buy;

    init();

    ////////////////

    function init() {
      query(itemId);
      setModal('buyModal', 'templates/modal/buy.html');
      setModal('cartModal', 'templates/modal/cart.html');
    }

    function cart() {

    }

    function buy() {
      var cart = {
        item: $scope.item
        , shop: $scope.shop
      };

      Cart.add(cart);

      $state.go('')
    }

    function setModal(name, tpl) {
      $ionicModal.fromTemplateUrl(tpl, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope[name]= modal;
      });

      $scope.closeModal = function(name) {
        $scope[name].hide();
        $scope.buyStatus = false;
      };
    }

    function query() {
      D('Item')
        .where({objectId: itemId})
        .find()
        .then(function(item) {
          $scope.item =item;
          return D('Shop')
            .where({objectId: item.get('shopId')})
            .find()
        })
        .then(function(shop) {
            $scope.shop = shop;
            $scope.$digest();
        })
        .catch(function(err) {
          console.error(err);
        })
    }

    function joinCart() {
      $scope.cartModal.show();
    }

    function joinBuy() {
      $scope.buyModal.show();
    }

    function incCount(type) {
      if (type == 'cart') {
        $scope.count.cart++;
      } else if (type == 'buy') {
        $scope.count.buy++;
      }
    }

    function decCount(type) {
      if (type == 'cart') {
        if ($scope.count.cart > 0) {
          $scope.count.cart--;
        }
      } else if (type == 'buy') {
        if ($scope.count.buy > 0) {
          $scope.count.buy--;
        }
      }
    }
  }
})();