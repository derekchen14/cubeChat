'use strict';

angular.module('chatApp')
  .controller('NameCtrl', function ($scope, $location, $timeout, Auth) {
    $scope.user = {};
    $scope.errors = {};
    $scope.userType = '';

    var generateImg = function() {
      var rand = Math.floor(Math.random()*4);
      var letters = ['A','B','C','D'];
      return "images/profile"+letters[rand]+".png";
    };
    var displayWarning = function() {
      var taken = 'That name is currently being used. Please try again in a couple minutes.';
      $scope.errors.mongoose = taken;
      $timeout(function(){
        $scope.errors.mongoose = '';
      }, 5000);
    };
    var enterUser = function() {
      sessionStorage.currentUser = $scope.user.username;
      $timeout(function() {
        $scope.$parent.flip('chat');
        // $location.path('/chat');
        Auth.startLeaving(true);
        clearUserDetails();
      }, 2400);
    };
    var clearUserDetails = function() {
      $timeout(function(){
        $scope.userType = '';
        $scope.user.username = '';
      }, 1000);
    };

    $scope.isAuthorized = function() {
      return (sessionStorage.currentUser !== undefined);
    };
    $scope.register = function(form) {
      $scope.submitted = true;
      $scope.user.profileImg = generateImg();

      if(form.$valid) {
        console.log('name: ', $scope.user.username);
        Auth.joinUser({
          name: $scope.user.username,
          profileImg: $scope.user.profileImg,
          createdAt: Date.now(),
          isActive: true
        })
        .then( function(data) {
          if (data.state === 'rejected') {
            displayWarning();
          } else if (data.state === 'entered') {
            $scope.userType = 'returningUser';
            enterUser();
          } else if (data.state === 'created') {
            $scope.userType = 'newUser';
            enterUser();
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