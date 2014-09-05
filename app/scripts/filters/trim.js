'use strict';

angular.module('chatApp')
  .filter('trim', function () {
    return function(input) {
      var parts = input.split(' ');
      return parts[0];
    };
  });