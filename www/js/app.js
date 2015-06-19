// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'gps', 'shop', 'starter.controllers', 'starter.services'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      // Each tab has its own nav history stack:

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-home.html'
          }
        }
      })

      .state('tab.shop', {
        url: '/shop',
        views: {
          'tab-shop': {
            templateUrl: 'templates/tab-shop.html'
          }
        }
      })

        //.state('tab.indent', {
        //  url: '/indent',
        //  views: {
        //    'tab-shop': {
        //      templateUrl: 'templates/indent.html'
        //    }
        //  }
        //})



      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html'
          }
        }
      })

      .state('tab.more', {
        url: '/more',
        views: {
          'tab-more': {
            templateUrl: 'templates/tab-more.html'
          }
        }
      })

      .state('category-list', {
        url: '/category-list',
        templateUrl: 'templates/category-list.html'
      })

      .state('shop-list', {
        url: '/shop-list',
        templateUrl: 'templates/shop-list.html'
      })

        .state('indent', {
          url: '/indent',
          templateUrl: 'templates/indent.html'
        })

        .state('indent-all', {
          url: '/indent-all',
          templateUrl: 'templates/indent-all.html'
        })

        .state('indent-Waiting-payment', {
          url: '/indent-Waiting-payment',
          templateUrl: 'templates/indent-Waiting-payment.html'
        })

        .state('indent-Waiting-get', {
          url: '/indent-Waiting-get',
          templateUrl: 'templates/indent-Waiting-get.html'
        })

        .state('gps', {
        url: '/gps',
        templateUrl: 'templates/gps.html',
        controller: 'GPSListCtrl'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  });
