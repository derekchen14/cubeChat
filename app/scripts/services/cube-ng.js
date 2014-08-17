'use strict';

angular.module('chatApp')
  .factory('Cube', function ($location, $rootScope, $cookieStore) {
    var directions = {
      home: 1,
      about: 4,
      tech: 1,
      name: 1,
      chat: 2,
      video: 3
    };
    $rootScope.directions = $cookieStore.get('directions') || directions;

    return {
      rotateClockwise: function() {
        // $rootScope.directions = {
        //   home: 1, about: 4, tech: 1, name: 1, chat: 2, video: 3
        // };
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