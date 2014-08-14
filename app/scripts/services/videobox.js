'use strict';

angular.module('chatApp')
  .factory('VideoBox', function (Connection, $rootScope, $timeout, $location) {
    var messages = [];
    var visitors = $rootScope;

    var foo = function() {
      messages.push(Connection);
      messages.push(visitors);
      messages.push($location.path);
    };

    $timeout(foo, 3000);
  });
