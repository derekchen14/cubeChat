'use strict';

angular.module('chatApp')
  .factory('Auth', function Auth(User, MySocket, $timeout) {
    var FORTY_SECONDS = 1000*40;
    // var TEN_MINUTES = 1000*60*10;

    var leaveUser = function() {
      console.log("visitor is leaving");
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
        if (firstTime) { MySocket.emit('joining', "test"); }
        var timer;
        console.log("fire centigrade");
        $timeout.cancel(timer);
        timer = $timeout(leaveUser, FORTY_SECONDS);
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