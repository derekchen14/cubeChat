'use strict';

angular.module('chatApp')
  .factory('Auth', function Auth(User, MySocket, $timeout) {
    // var FOUR_SECONDS = 1000*4;
    var TEN_MINUTES = 1000*60*10;
    var timer;

    var leaveUser = function() {
      if (sessionStorage.currentUser !== undefined) {
        MySocket.emit('leaving', {name: sessionStorage.currentUser});
        sessionStorage.removeItem("currentUser");
      }
    };

    return {
      joinUser: function(user) {
        return User.save(user).$promise;
      },
      switchUser: function() {
        leaveUser();
      },
      startLeaving: function(firstTime) {
        if (firstTime) { MySocket.emit('joining', "newUser"); }
        $timeout.cancel(timer);
        timer = $timeout(leaveUser, TEN_MINUTES);
      },
      changeProfile: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;
        return User.update({
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      }

    };
  });