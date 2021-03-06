AV.initialize('ry3vkr5qo327u3zxk62ifezixglq2lqfmutkthm0c050z9j9', 'abhpp7rycpzbsbvzikr4vsv6giq39z15lk009b7j2ti7z55h');
var LOGIN_TEMPLATE = 'templates/login.html';

angular.module('starter', ['ionic', 'user', 'account', 'address', 'gps', 'item', 'order', 'shop', 'utils', 'yike.utils', 'starter.controllers', 'starter.services'])

  .run(function ($ionicPlatform, $rootScope, $location, $timeout, $ionicHistory, $yikeUtils) {
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


      //双击退出
      $ionicPlatform.registerBackButtonAction(function (e) {
        //判断处于哪个页面时双击退出
        var path = $location.path();
        if (path == '/home' || path == '/shop' || path == '/account' || path == '/more') {
          if ($rootScope.backButtonPressedOnceToExit) {
            ionic.Platform.exitApp();
          } else {
            $rootScope.backButtonPressedOnceToExit = true;
            $yikeUtils.alert('再按一次退出系统');
            setTimeout(function () {
              $rootScope.backButtonPressedOnceToExit = false;
            }, 2000);
          }
        } else if ($ionicHistory.backView()) {
          $ionicHistory.goBack();
        } else {
          $rootScope.backButtonPressedOnceToExit = true;
          $yikeUtils.alert('再按一次退出系统');
          setTimeout(function () {
            $rootScope.backButtonPressedOnceToExit = false;
          }, 2000);
        }
        e.preventDefault();
        return false;
      }, 101);
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    //这里对android进行一些配置,为了保证ios和安卓平台显示效果一致
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-left');
    $ionicConfigProvider.views.swipeBackEnabled(false);

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      //首页
      .state('home', {
        url: '/home',
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl',
        cache: false
      })

      //商家
      .state('shop', {
        url: '/shop/:categoryName',
        cache: false,
        templateUrl: 'templates/tab-shop.html',
        controller: 'ShopListCtrl'
      })

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
        templateUrl: 'templates/tab-more.html',
        controller: 'MoreCtrl'
      })

      //帮助中心
      .state('help', {
        url: '/help',
        templateUrl: 'templates/help.html'
      })

      //招商加盟
      .state('zhaoshang', {
        url: '/zhaoshang',
        templateUrl: 'templates/zhaoshang.html'
      })

      //关于
      .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html'
      })

      //用户协议
      .state('xieyi', {
        url: '/xieyi',
        templateUrl: 'templates/xieyi.html'
      })

      //分类列表
      //todo: 自助餐几个字太大了
      .state('category-list', {
        url: '/category-list',
        templateUrl: 'templates/category-list.html'
      })

      //产品搜索
      //todo: 跟效果图有出入
      .state('product-search', {
        url: '/product-search',
        templateUrl: 'templates/product-search.html',
        controller: 'SearchCtrl',
        cache: false
      })

      //店铺搜索
      //todo: 跟效果图有出入
      .state('shop-search', {
        url: '/shop-search',
        templateUrl: 'templates/shop-search.html',
        controller: 'SearchCtrl',
        cache: false
      })

      //店铺评论
      //todo: 跟效果图有出入
      .state('mc-evaluation', {
        url: '/mc-evaluation',
        templateUrl: 'templates/mc-evaluation.html'
      })

      //确认订单
      .state('order-submit', {
        url: '/order-submit',
        templateUrl: 'templates/order-submit.html',
        controller: 'OrderSubmitCtrl',
        cache: false
      })

      //线上支付
      .state('payOnline', {
        url: '/online-payment/:orderId',
        templateUrl: 'templates/online-payment.html'
      })

      //现金支付
      .state('payCash', {
        url: '/cash-payment/:orderId',
        templateUrl: 'templates/cash-payment.html'
      })

      //添加地址
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

      //收货地址
      .state('address-manage', {
        url: '/address-manage',
        templateUrl: 'templates/address-manage.html',
        controller: 'AddressManageCtrl'
      })

      //编辑收货地址
      .state('address-edit', {
        url: '/address-edit/:id',
        templateUrl: 'templates/address-edit.html',
        controller: 'AddressEditCtrl'
      })

      //选择地址
      .state('address-select', {
        url: '/address-select',
        templateUrl: 'templates/address-select.html',
        controller: 'AddressSelectCtrl',
        cache: false
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
        templateUrl: 'templates/personal-center.html'
      })

      //我的订单
      .state('orders', {
        url: '/orders',
        templateUrl: 'templates/orders.html',
        controller: 'OrderListCtrl'
      })

      //全部订单
      .state('indent-all', {
        url: '/indent-all',
        templateUrl: 'templates/indent-all.html'
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
        templateUrl: 'templates/my-recommend.html',
        controller: 'UserRecommendCtrl'
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

      //收藏
      .state('collect', {
        url: '/collect',
        templateUrl: 'templates/collect.html',
        controller: 'AccountCollectCtrl'
      })

      //评价详情
      .state('evaluate-detail', {
        url: '/evaluate-detail',
        templateUrl: 'templates/evaluate-detail.html'
      })

      //注册
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'UserRegCtrl'
      })

      //编辑资料
      .state('data-editing', {
        url: '/data-editing/:type',
        templateUrl: 'templates/data-editing.html',
        controller: 'UserEditCtrl',
        cache: false
      })

      //特卖会列表
      .state('big-sell', {
        url: '/big-sell',
        templateUrl: 'templates/big-sell.html',
        controller: 'ItemBigsellCtrl',
        cache: false
      })

      //特卖会详情
      .state('big-sell-details', {
        url: '/big-sell-details/:id',
        templateUrl: 'templates/big-sell-details.html',
        controller: 'ItemBigsellDetailsCtrl',
        cache: false
      })

      .state('vouchers', {
        url: '/vouchers',
        templateUrl: 'templates/vouchers.html',
        controller: 'ItemVouchersCtrl',
        cache: false
      })

      .state('vouchers-details', {
        url: '/vouchers-details/:id',
        templateUrl: 'templates/vouchers-details.html',
        controller: 'ItemVouchersDetailsCtrl',
        cache: false
      })

      .state('buying', {
        url: '/buying',
        templateUrl: 'templates/buying.html',
        controller: 'ItemBuyingCtrl',
        cache: false
      })

      .state('buying-details', {
        url: '/buying-details/:id',
        templateUrl: 'templates/buying-details.html',
        controller: 'ItemBuyingDetailsCtrl',
        cache: false
      })

      .state('cash-back', {
        url: '/cash-back',
        templateUrl: 'templates/cash-back.html',
        controller: 'ItemCashBackCtrl',
        cache: false
      })

      .state('cash-back-details', {
        url: '/cash-back-details/:id',
        templateUrl: 'templates/cash-back-details.html',
        controller: 'ItemCashBackDetailsCtrl',
        cache: false
      })

      .state('map', {
        url: '/map/:shopId',
        templateUrl: 'templates/map.html',
        controller: 'ShopMapCtrl',
        cache: false
      })

      .state('gps', {
        url: '/gps',
        templateUrl: 'templates/gps.html',
        controller: 'GPSListCtrl',
        cache: false
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

  });
