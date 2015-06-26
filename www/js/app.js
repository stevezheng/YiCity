// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'gps', 'shop', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
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

    .config(function ($stateProvider, $urlRouterProvider) {

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

            .state('gps', {
                url: '/gps',
                templateUrl: 'templates/gps.html',
                controller: 'GPSListCtrl'
            })

        .
        state('shop-list', {
            url: '/shop-list',
            templateUrl: 'templates/shop-list.html'
        })

            .state('product-search', {
                url: '/product-search',
                templateUrl: 'templates/product-search.html'
            })

            .state('shop-search', {
                url: '/shop-search',
                templateUrl: 'templates/shop-search.html'
            })

            .state('mc-homepage-nocart', {
                url: '/mc-homepage-nocart',
                templateUrl: '../templates/mc-homepage-nocart.html'
            })

            .state('mc-homepage', {
                url: '/mc-homepage',
                templateUrl: 'templates/mc-homepage.html'
            })


            .state('mc-evaluation', {
                url: '/mc-evaluation',
                templateUrl: 'templates/mc-evaluation.html'
            })

            .state('submit-orders', {
                url: '/submit-orders',
                templateUrl: 'templates/submit-orders.html'
            })

            .state('online-payment', {
                url: '/online-payment',
                templateUrl: 'templates/online-payment.html'
            })
            .state('cash-payment', {
                url: '/cash-payment',
                templateUrl: 'templates/cash-payment.html'
            })

            .state('add-address', {
                url: '/add-address',
                templateUrl: 'templates/add-address.html'
            })
            .state('area', {
                url: '/area',
                templateUrl: 'templates/area.html'
            });



        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');

    });
