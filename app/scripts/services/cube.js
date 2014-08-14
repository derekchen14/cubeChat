'use strict';

angular.module('chatApp')
  .factory('Cube', function ($location, $rootScope, $cookieStore) {
    // Get currentUser from cookie
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');

    return {
      rotateClockwise: function() {
        if($rootScope.currentUser) {
          return $rootScope.currentUser.role !== 'guest';
        }
        return false;
      },
      rotateCounterClockwise: function() {
        if($rootScope.currentUser) {
          return $rootScope.currentUser.role !== 'guest';
        }
        return false;
      },

      turnUp: function() {
        return false;
      },
      turnDown: function() {
        return false;
      },
      turnLeft: function() {
        return false;
      },
      turnRight: function() {
        return false;
      },

      adjacent: function() {
        return false;
      }

    };
  });