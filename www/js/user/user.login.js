(function () {
  'use strict';

  angular
    .module('user.login', [])
    .controller('UserLoginCtrl', UserLoginCtrl);

  UserLoginCtrl.$inject = ['$scope', 'User'];

  /* @ngInject */
  function UserLoginCtrl($scope, User) {
    $scope.init = init;
    $scope.user = {
      phone: ''
      , password: ''
    };
    $scope.submit = submit;

    init();

    ////////////////

    function init() {
    }

    function submit() {
      User
        .login($scope.user.phone, $scope.user.password)
        .then(function(user) {
          console.log(user);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
})();