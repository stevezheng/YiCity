(function () {
  'use strict';

  angular
    .module('order.submit', [])
    .controller('OrderSubmitCtrl', OrderSubmitCtrl);

  OrderSubmitCtrl.$inject = ['$scope', '$state', '$yikeUtils', '$ionicHistory', 'Cart'];

  /* @ngInject */
  function OrderSubmitCtrl($scope, $state, $yikeUtils, $ionicHistory, Cart) {
    $scope.init = init;
    $scope.addresses = [];
    $scope.submit = submit;
    $scope.setPay = setPay;
    $scope.setMethod = setMethod;
    $scope.tmpCart = Cart.getTmpCart();
    $scope.radios = {
      pay: 0,
      method: 0
    };

    init();

    ////////////////

    function init() {
      $scope.tmpCart = Cart.getTmpCart();
      if (!$scope.tmpCart.items) {
        $yikeUtils.alert('提示', '购物车是空的,请先挑选商品', function() {
          $ionicHistory.goBack();
        });
        return false;
      }

      addresses();
    }

    function setPay(type) {
      $scope.pay = type;
    }
    function setMethod(type) {
      $scope.method = type;
    }

    function addresses() {
      D('Address')
        .where({userId: AV.User.current().id})
        .select()
        .then(function(addresses) {
          $scope.addresses = addresses;
          $scope.$digest();
        })
    }

    function submit() {
      if (!$scope.tmpCart.items) {
        $yikeUtils.alert('提示', '购物车是空的,请先挑选商品');
        return false;
      }
      if ($scope.radios.pay == 0) {
        $yikeUtils.alert('提示', '在线支付功能即将到来');
      } else {
        $scope.tmpCart.payMethod = $scope.radios.pay;
        $scope.tmpCart.useMethod = $scope.radios.method;
        $scope.tmpCart.vocherId = '';
        $scope.tmpCart.address = {
          name: $scope.addresses[0].get('name')
          , phone: $scope.addresses[0].get('phone')
          , province: $scope.addresses[0].get('province')
          , city: $scope.addresses[0].get('city')
          , area: $scope.addresses[0].get('area')
          , address: $scope.addresses[0].get('address')
        };

        var Post = AV.Object.extend("Order");
        var _order  = new Post();
        AV._.mapObject($scope.tmpCart, function (val, key) {
          _order.set(key, val);
        });

        _order.save(null, {
          success: function(post) {
            // 成功保存之后，执行其他逻辑.
            alert('New object created with objectId: ' + post.id);
          },
          error: function(post, error) {
            // 失败之后执行其他逻辑
            // error 是 AV.Error 的实例，包含有错误码和描述信息.
            alert('Failed to create new object, with error message: ' + error.message);
          }
        });

        //D('Order')
        //  .add($scope.tmpCart)
        //  .then(function(order) {
        //    if (order.get('pay') == 0) {
        //      $yikeUtils.confirm('提示', '订单提交成功,现在去支付?')
        //        .then(function() {
        //          $state.go('payOnline', {'orderId':order.id});
        //        })
        //    } else {
        //      $yikeUtils.alert('提示', '订单提交成功');
        //      $state.go('orders')
        //    }
        //  })
      }
    }
  }
})();