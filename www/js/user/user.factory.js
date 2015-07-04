(function () {
  'use strict';

  angular
    .module('user.factory', [])
    .factory('User', User);


  /* @ngInject */
  function User() {
    return {
      query: query
    };

    ////////////////

    function query(where, page, num) {
    }

    function login(username, password) {

    }

    function reg(username, password, phone, email) {

    }
  }
})();