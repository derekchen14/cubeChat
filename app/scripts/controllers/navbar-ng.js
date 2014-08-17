'use strict';

angular.module('chatApp')
  .controller('NavbarCtrl', function ($scope, Auth, MySocket) {
    $scope.initData = function() {
      MySocket.reconnect();
    };

    $scope.Auth = Auth;
  });