(function () {
  'use strict';

  angular
    .module('address.manage', [])
    .controller('AddressManageCtrl', AddressManageCtrl);

  AddressManageCtrl.$inject = ['$scope', '$yikeUtils'];

  /* @ngInject */
  function AddressManageCtrl($scope, $yikeUtils) {
    $scope.init = init;
    $scope.edit = edit;
    $scope.del = del;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      D('Address')
        .where({userId: AV.User.current().id})
        .select()
        .then(function(addresses) {
          $scope.addresses = addresses;
        })
    }

    function del(address) {
      $yikeUtils
        .confirm('提示', '是否删除地址?')
        .then(function(res) {
          if (res) {
            D('Address')
              .where({userId: AV.User.current().id, objectId: address.id})
              .find()
              .then(function(_address) {
                _address.destroy({
                  success: function() {
                    $yikeUtils.alert('提示', '删除成功');
                    init();
                  },

                  error: function() {
                    $yikeUtils.alert('提示', '删除失败');
                    init();
                  }
                });
              })
          }
        })
    }

    function edit(address) {

    }
  }
})();