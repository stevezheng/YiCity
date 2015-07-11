AV.initialize('ry3vkr5qo327u3zxk62ifezixglq2lqfmutkthm0c050z9j9', 'abhpp7rycpzbsbvzikr4vsv6giq39z15lk009b7j2ti7z55h');
var LOGIN_TEMPLATE = 'templates/login.html';

angular.module('starter', ['ionic', 'user', 'address', 'gps', 'item', 'order', 'shop', 'yike.utils', 'starter.controllers', 'starter.services'])

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

      //返回按钮
      $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();
        return false;
      }, 100);
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    //这里对android进行一些配置,为了保证ios和安卓平台显示效果一致
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-left');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      //首页
      .state('home', {
        url: '/home',
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      })

      //商家
      .state('shop', {
        url: '/shop/:categoryName',
        cache: false,
        templateUrl: 'templates/tab-shop.html',
        controller: 'ShopListCtrl'
      })

      ////todo: 跟效果图有出入
      //.state('mc-homepage-nocart', {
      //  url: '/mc-homepage-nocart',
      //  templateUrl: 'templates/mc-homepage-nocart.html'
      //})

      //商家详情
      .state('homepage', {
        url: '/homepage/:shopId',
        templateUrl: 'templates/mc-homepage.html',
        controller: 'ShopDetailsCtrl'
      })

      //产品详情
      .state('commodity-details', {
        url: '/commodity-details/:itemId',
        templateUrl: 'templates/commodity-details.html',
        controller: 'ItemDetailsCtrl'
      })

      //用户中心
      .state('account', {
        url: '/account',
        templateUrl: 'templates/tab-account.html',
        controller: 'UserCtrl',
        cache: false
      })

      //更多
      .state('more', {
        url: '/more',
        templateUrl: 'templates/tab-more.html'
      })

      //分类列表
      //todo: 自助餐几个字太大了
      .state('category-list', {
        url: '/category-list',
        templateUrl: 'templates/category-list.html'
      })

      //.state('shop-list', {
      //  url: '/shop-list/:categoryId',
      //  templateUrl: 'templates/shop-list.html',
      //  controller: 'ShopListCtrl'
      //})

      //产品搜索
      //todo: 跟效果图有出入
      .state('product-search', {
        url: '/product-search',
        templateUrl: 'templates/product-search.html'
      })

      //店铺搜索
      //todo: 跟效果图有出入
      .state('shop-search', {
        url: '/shop-search',
        templateUrl: 'templates/shop-search.html'
      })

      //店铺平路
      //todo: 跟效果图有出入
      .state('mc-evaluation', {
        url: '/mc-evaluation',
        templateUrl: 'templates/mc-evaluation.html'
      })

      //确认订单
      //todo: 跟效果图有出入
      .state('order', {
        url: '/order/:orderId',
        templateUrl: 'templates/order.html',
        controller: 'OrderSubmitCtrl',
        cache: false
      })

      //线上支付
      .state('payOnline', {
        url: '/online-payment',
        templateUrl: 'templates/online-payment.html'
      })

      //现金支付
      .state('payCash', {
        url: '/cash-payment',
        templateUrl: 'templates/cash-payment.html'
      })

      //添加地址
      //todo: 跟效果图有出入
      .state('add-address', {
        url: '/add-address',
        templateUrl: 'templates/add-address.html',
        controller: 'AddressAddCtrl'
      })

      //所在地区
      .state('area', {
        url: '/area',
        templateUrl: 'templates/area.html'
      })

      //编辑地址
      .state('receiving-address-management', {
        url: '/receiving-address-management',
        templateUrl: 'templates/receiving-address-management.html'
      })

      //登录
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html'
      })

      //注册成功
      .state('registered-success', {
        url: '/registered-success',
        templateUrl: 'templates/registered-success.html'
      })

      //个人中心
      .state('personal-center', {
        url: '/personal-center',
        templateUrl: '/templates/personal-center.html'
      })

      //我的订单
      .state('indent', {
        url: '/indent',
        templateUrl: 'templates/indent.html'
      })

      //全部订单
      .state('indent-all', {
        url: '/indent-all',
        templateUrl: 'templates/indent-all.html'
      })

      //待付款订单
      .state('indent-waiting-payment', {
        url: '/indent-waiting-payment',
        templateUrl: 'templates/indent-waiting-payment.html'
      })

      .state('indent-waiting-get', {
        url: '/indent-waiting-get',
        templateUrl: 'templates/indent-waiting-get.html'
      })

      //忘记密码
      .state('forget-password', {
        url: '/forget-password',
        templateUrl: 'templates/forget-password.html',
        controller: 'UserForgetPasswordCtrl'
      })

      //提现申请
      .state('draw-cash-apply', {
        url: '/draw-cash-apply',
        templateUrl: 'templates/draw-cash-apply.html'
      })

      //返利
      .state('back-benefit', {
        url: '/back-benefit',
        templateUrl: 'templates/back-benefit.html'
      })

      //编辑购物车
      .state('edit-shopping-cart', {
        url: '/edit-shopping-cart',
        templateUrl: 'templates/edit-shopping-cart.html'
      })

      //购物车
      .state('shopping-cart', {
        url: '/shopping-cart',
        templateUrl: 'templates/shopping-cart.html',
        controller: 'OrderShoppingCtrl',
        cache: false
      })

      //选择商品
      .state('commodity-choose', {
        url: '/commodity-choose',
        templateUrl: 'templates/commodity-choose.html'
      })

      //选择立即购买
      .state('commodity-buy', {
        url: '/commodity-buy',
        templateUrl: 'templates/commodity-buy.html'
      })

      //消息详情
      .state('information-details', {
        url: '/information-details',
        templateUrl: 'templates/information-details.html'
      })

      //我的推荐
      .state('my-recommend', {
        url: '/my-recommend',
        templateUrl: 'templates/my-recommend.html'
      })

      //我的消息
      .state('my-information', {
        url: '/my-information',
        templateUrl: 'templates/my-information.html'
      })

      //商家排序
      .state('merchant-sort', {
        url: '/merchant-sort',
        templateUrl: 'templates/merchant-sort.html'
      })

      //商圈选择
      .state('business-district', {
        url: '/business-district',
        templateUrl: 'templates/business-district.html'
      })

      //商家分类
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
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

  });
