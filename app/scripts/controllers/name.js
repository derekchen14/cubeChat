'use strict';

angular.module('chatApp')
  .controller('NameCtrl', function ($scope, $location, MySocket, Auth) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.checkUser({
          name: $scope.user.username,
          // profileImg: $scope.user.profile_img,
          // messages: [
          //   {msg: 'red', time: Date.now()},
          //   {msg: 'green', time: Date.now()},
          //   {msg: 'yellow', time: Date.now()}
          // ],
          createdAt: Date.now(),
          isActive: true
        })
        .then( function() {
          MySocket.reconnect();
          $location.path('/name');
        })
        .catch( function(err) {
          err = err.data;

          if (err.message === undefined) {
            $scope.errors.mongoose = 'There was an error getting started, please try again later.';
          } else {
            $scope.errors.mongoose = err.message;
          }
        });
      }
    };
  });