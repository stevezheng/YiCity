(function () {
  'use strict';

  angular
    .module('utils.back', [])
    .directive('utilsBack', UtilsBack);

  UtilsBack.$inject = ['$ionicHistory'];

  /* @ngInject */
  function UtilsBack($ionicHistory) {
    console.log('load');
    // Usage:
    // 
    // Creates:
    // 
    var directive = {
      template: ' <button class="button button-clear ion-chevron-left pull-left"></button>',
      link: link,
      replace: true,
      restrict: 'AE'
    };
    return directive;

    function link(scope, element, attrs) {
      element.bind('click', function(e) {
        $ionicHistory.goBack();
      })
    }
  }
})();