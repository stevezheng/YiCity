(function () {
  'use strict';

  angular
    .module('user.factory', [])
    .factory('User', User);


  /* @ngInject */
  function User() {
    return {
      query: query
      , login: login
    };

    ////////////////

    function query(where, page, num) {
    }

    function login(username, password) {
      return new Promise(function(resolve, reject) {
        AV.User.logIn(username, password, {
          success: function(user) {
            resolve(user);
          },

          error: function(err, user) {
            reject(err);
          }
        })
      });
    }

    function reg(username, password, phone, email) {

    }
  }
})();