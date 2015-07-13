(function () {
  'use strict';

  angular
    .module('gps.factory', [])
    .factory('GPS', GPS);

  GPS.$inject = ['$http', '$yikeUtils', '$state'];

  /* @ngInject */
  function GPS($http, $yikeUtils, $state) {
    var city = '厦门';
    var area = '思明区';
    var cityList = ['厦门', '北京', '上海', '成都'];
    var areaList = ['思明区', '湖里区', '集美区', '海沧区', '翔安区', '同安区'];
    var currentCity = function (cb) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showErr);
      }
      function showPosition(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var ak = '693495a21868a3899fe669e8a73dc7d3';
        $http.jsonp('http://api.map.baidu.com/geocoder/v2/?ak=' + ak + '&callback=?&location=' + lat + ',' + long + '&output=json&pois=0&callback=angular.callbacks._1').
          success(function (result) {
          });
        $http.jsonp('http://api.map.baidu.com/geocoder/v2/?ak=' + ak + '&callback=?&location=' + lat + ',' + long + '&output=json&pois=0&callback=angular.callbacks._1')
          .success(function (res) {
            city = res.result.addressComponent.city;
            cb(res);
          })
          .error(function (res, err) {
            console.log(res);
            console.log(err);
          });
      }

      function showErr(error) {
        var result;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            result = "User denied the request for Geolocation."
            break;
          case error.POSITION_UNAVAILABLE:
            result = "Location information is unavailable."
            break;
          case error.TIMEOUT:
            result = "The request to get user location timed out."
            break;
          case error.UNKNOWN_ERROR:
            result = "An unknown error occurred."
            break;
        }
        alert(result);
      }
    };

    function setCity(_city) {
      $yikeUtils.alert('提示', '设置城市成功');
      city = _city;
      $state.go('home');
    }

    function getCity() {
      return city;
    }

    return {
      city: city
      , area: area
      , cityList: cityList
      , areaList: areaList
      , currentCity: currentCity
      , setCity: setCity
      , getCity: getCity
    };
  }
})();
