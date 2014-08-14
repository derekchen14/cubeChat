'use strict';

angular.module('chatApp')
  .controller('ChatCtrl', function ($scope, ChatBox) {
    $scope.getMessages = ChatBox.getMessages;
    $scope.getVisitors = ChatBox.getVisitors;

    $scope.sendMessage = function () {
      if(!$scope.newMessage) {
        return;
      }
      ChatBox.sendMessage($scope.newMessage);
      $scope.newMessage = '';
    };
  });