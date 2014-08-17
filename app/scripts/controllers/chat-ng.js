'use strict';

angular.module('chatApp')
  .controller('ChatCtrl', function ($scope, ChatBox) {
    $scope.getMessages = ChatBox.getMessages;
    $scope.getVisitors = ChatBox.getVisitors;

    $scope.findHouse = function() {
      console.log(sessionStorage.currentUser);
    };
    $scope.isAuthorized = function() {
      return (sessionStorage.currentUser !== undefined);
    };
    $scope.sendMessage = function () {
      if(!$scope.newMessage) {
        return;
      }
      ChatBox.sendMessage($scope.newMessage);
      $scope.newMessage = '';
    };
  });