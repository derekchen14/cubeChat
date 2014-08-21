'use strict';

angular.module('chatApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.Auth = Auth;
  });