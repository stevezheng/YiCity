(function () {
  'use strict';

  angular
    .module('user.recommend', [])
    .controller('UserRecommendCtrl', UserRecommendCtrl);

  UserRecommendCtrl.$inject = ['$scope'];

  /* @ngInject */
  function UserRecommendCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
      D('User')
        .where({inviteCode: AV.User.current().get('autoId').toString()})
        .select()
        .then(function(users) {
          console.log(users);
          $scope.users = users;
        })
    }
  }
})();