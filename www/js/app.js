AV.initialize('ry3vkr5qo327u3zxk62ifezixglq2lqfmutkthm0c050z9j9', 'abhpp7rycpzbsbvzikr4vsv6giq39z15lk009b7j2ti7z55h');
var LOGIN_TEMPLATE = '/templates/login.html';

angular.module('starter', ['ionic', 'user', 'gps', 'shop', 'yike.utils', 'starter.controllers', 'starter.services'])

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
            templateUrl: 'templates/tab-account.html',
            controller: 'UserCtrl'
          }
        },
        cache: false
      })

      .state('tab.more', {
        url: '/more',
        views: {
          'tab-more': {
            templateUrl: 'templates/tab-more.html'
          }
        }
      })

      //todo: 自助餐几个字太大了
      .state('category-list', {
        url: '/category-list',
        templateUrl: 'templates/category-list.html'
      })

      //.state('gps', {
      //  url: '/gps',
      //  templateUrl: 'templates/gps.html',
      //  controller: 'GPSListCtrl'
      //})

      .state('shop-list', {
        url: '/shop-list/:categoryId',
        templateUrl: 'templates/shop-list.html',
        controller: 'ShopListCtrl'
      })

      //todo: 跟效果图有出入
      .state('product-search', {
        url: '/product-search',
        templateUrl: 'templates/product-search.html'
      })

      //todo: 跟效果图有出入
      .state('shop-search', {
        url: '/shop-search',
        templateUrl: 'templates/shop-search.html'
      })

      //todo: 跟效果图有出入
      .state('mc-homepage-nocart', {
        url: '/mc-homepage-nocart',
        templateUrl: 'templates/mc-homepage-nocart.html'
      })

      .state('mc-homepage', {
        url: '/mc-homepage/:shopId',
        templateUrl: 'templates/mc-homepage.html',
        controller: 'ShopDetailsCtrl'
      })

      //todo: 跟效果图有出入
      .state('mc-evaluation', {
        url: '/mc-evaluation',
        templateUrl: 'templates/mc-evaluation.html'
      })

      //todo: 跟效果图有出入
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

      //todo: 跟效果图有出入
      .state('add-address', {
        url: '/add-address',
        templateUrl: 'templates/add-address.html'
      })
      .state('area', {
        url: '/area',
        templateUrl: 'templates/area.html'
      })

      .state('receiving-address-management', {
        url: '/receiving-address-management',
        templateUrl: 'templates/receiving-address-management.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html'
      })
      //.state('register', {
      //  url: '/register',
      //  templateUrl: 'templates/register.html'
      //})
      .state('registered-success', {
        url: '/registered-success',
        templateUrl: 'templates/registered-success.html'
      })
      .state('personal-center', {
        url: '/personal-center',
        templateUrl: '/templates/personal-center.html'
      })

      //.state('category-list', {
      //  url: '/category-list',
      //  templateUrl: 'templates/category-list.html'
      //})

      //.state('shop-list', {
      //  url: '/shop-list',
      //  templateUrl: 'templates/shop-list.html'
      //})

      .state('indent', {
        url: '/indent',
        templateUrl: 'templates/indent.html'
      })

      .state('indent-all', {
        url: '/indent-all',
        templateUrl: 'templates/indent-all.html'
      })

      .state('indent-waiting-payment', {
        url: '/indent-waiting-payment',
        templateUrl: 'templates/indent-waiting-payment.html'
      })

      .state('indent-waiting-get', {
        url: '/indent-waiting-get',
        templateUrl: 'templates/indent-waiting-get.html'
      })

      .state('forget-password', {
        url: '/forget-password',
        templateUrl: 'templates/forget-password.html',
        controller: 'UserForgetPasswordCtrl'
      })

      .state('draw-cash-apply', {
        url: '/draw-cash-apply',
        templateUrl: 'templates/draw-cash-apply.html'
      })

      .state('back-benefit', {
        url: '/back-benefit',
        templateUrl: 'templates/back-benefit.html'
      })

      .state('edit-shopping-cart', {
        url: '/edit-shopping-cart',
        templateUrl: 'templates/edit-shopping-cart.html'
      })

      .state('shopping-cart', {
        url: '/shopping-cart',
        templateUrl: 'templates/shopping-cart.html'
      })

      .state('commodity-details', {
        url: '/commodity-details',
        templateUrl: 'templates/commodity-details.html'
      })

      .state('commodity-choose', {
        url: '/commodity-choose',
        templateUrl: 'templates/commodity-choose.html'
      })

      .state('commodity-buy', {
        url: '/commodity-buy',
        templateUrl: 'templates/commodity-buy.html'
      })

      .state('information-details', {
        url: '/information-details',
        templateUrl: 'templates/information-details.html'
      })

      .state('my-recommend', {
        url: '/my-recommend',
        templateUrl: 'templates/my-recommend.html'
      })

      .state('my-information', {
        url: '/my-information',
        templateUrl: 'templates/my-information.html'
      })

      .state('merchant-sort', {
        url: '/merchant-sort',
        templateUrl: 'templates/merchant-sort.html'
      })

      .state('business-district', {
        url: '/business-district',
        templateUrl: 'templates/business-district.html'
      })

      .state('merchant-classify', {
        url: '/merchant-classify',
        templateUrl: 'templates/merchant-classify.html'
      })

      //todo: 跟效果图有一定出入
      .state('collect', {
        url: '/collect',
        templateUrl: 'templates/collect.html'
      })

      .state('evaluate-detail', {
        url: '/evaluate-detail',
        templateUrl: 'templates/evaluate-detail.html'
      })


      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'UserRegCtrl'
      })
      .state('data-editing', {
        url: '/data-editing',
        templateUrl: '/templates/data-editing.html'
      })

      .state('gps', {
        url: '/gps',
        templateUrl: 'templates/gps.html',
        //controller: 'GPSListCtrl'
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  });
