(function () {
  'use strict';

  angular
    .module('shop.map', [])
    .controller('ShopMapCtrl', ShopMapCtrl);

  ShopMapCtrl.$inject = ['$scope', '$state'];

  /* @ngInject */
  function ShopMapCtrl($scope, $state) {
    var shopId = $state.params.shopId;
    init();

    ////////////////

    function init() {
      // 百度地图API功能
      var map = new BMap.Map("allmap");    // 创建Map实例
      var point = new BMap.Point(104.06, 30.67);
      map.centerAndZoom(point, 17);  // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
      map.setCurrentCity("成都");          // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      D('Shop')
        .where({objectId: shopId})
        .find()
        .then(function(shop) {
          var lat = 104.06;
          var long = 30.67;
          var sContent ="未查询到商家地址";
          if (shop) {
            lat = shop.get('lat');
            long = shop.get('long');
            sContent = shop.get('name');
          }

          var newPoint = new BMap.Point(lat, long);
          map.panTo(newPoint);
          var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
          map.openInfoWindow(infoWindow,newPoint); //开启信息窗口
        })
    }
  }
})();