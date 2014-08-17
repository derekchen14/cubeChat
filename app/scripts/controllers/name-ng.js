'use strict';
angular.module('chatApp')
  .controller('NameCtrl', function ($scope, $location, Auth) {
    $scope.user = {};
    $scope.errors = {};

    var generateImg = function() {
      var rand = Math.floor(Math.random()*4);
      var letters = ['A','B','C','D'];
      return "images/profile"+letters[rand]+".png";
    };
    var displayWarning = function() {
      var taken = 'That name is currently being used. Please try again in a couple minutes.';
      console.log(taken);
    };

    $scope.isAuthorized = function() {
      return (sessionStorage.currentUser !== undefined);
    };
    $scope.register = function(form) {
      $scope.submitted = true;
      $scope.user.profileImg = generateImg();

      if(form.$valid) {
        Auth.joinUser({
          name: $scope.user.username,
          profileImg: $scope.user.profileImg,
          createdAt: Date.now(),
          isActive: true
        })
        .then( function(data) {
          if (data.state === 'rejected') {
            displayWarning();
          } else {
            console.log("Join State: ", data.state);
            sessionStorage.currentUser = $scope.user.username;
            Auth.startLeaving(true);
            $location.path('/chat');
          }
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
    $scope.switchUser = function() {
      Auth.switchUser();
    };

  });