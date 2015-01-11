'use strict';

/**
 * @ngdoc service
 * @name loopbackApp.AppAuth
 * @description
 * # AppAuth
 * Factory in the loopbackApp.
 */
angular.module('yoApp')
  .factory('Auth', function () {
    return {
      currentUser: null,

      // Note: we can't make the User a dependency of AppAuth
      // because that would create a circular dependency
      //   Auth <- $http <- $resource <- LoopBackResource <- User <- AppAuth
      ensureHasCurrentUser: function(User) {
        if (this.currentUser) {
          if (this.currentUser.id === 'social') {
            this.currentUser = User.getAccount(function(data) {
              // success
              console.log("Data User1 :", data);
            }, function () {
              console.log('User.getAccount() err', arguments);
            });
          } else {
            console.log('Using cached current user.');
          }
        } else {
          console.log('Fetching current user from the server.');
          this.currentUser = User.getCurrent(function(data) {
            // success
            console.log("Data User1 :", data);
          }, function(response) {
            console.log('User.getCurrent() err', arguments, response);
          });
        }
      }
    };
  });
