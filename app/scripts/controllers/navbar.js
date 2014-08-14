'use strict';

angular.module('chatApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, MySocket) {
    $scope.logout = function() {
      Auth.logout()
        .then(function() {
          // Reconnect to socket as guest
          MySocket.reconnect();

          $location.path('/login');
        });
    };

    $scope.Auth = Auth;
  });