(function () {
  'use strict';

  angular
    .module('item.details', [])
    .controller('ItemDetailsCtrl', ItemDetailsCtrl);

  ItemDetailsCtrl.$inject = ['$scope', '$state', '$ionicModal'];

  /* @ngInject */
  function ItemDetailsCtrl($scope, $state, $ionicModal) {
    var itemId = $state.params.itemId;
    $scope.init = init;
    $scope.item = null;
    $scope.shop = null;
    $scope.joinCart = joinCart;
    $scope.buy = buy;
    $scope.buyModal = null;
    $scope.cartModal = null;

    init();

    ////////////////

    function init() {
      query(itemId);
      setModal('buyModal', 'templates/modal/buy.html');
      setModal('cartModal', 'templates/modal/cart.html');
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
      //$scope.buyStatus = true;
    }

    function buy() {
      $scope.buyModal.show();
      //$scope.buyStatus = true;
    }
  }
})();