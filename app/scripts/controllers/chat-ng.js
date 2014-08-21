'use strict';

angular.module('chatApp')
  .controller('ChatCtrl', function ($scope, MySocket, $rootScope, Auth, $timeout) {
    $scope.messages = [];
    $scope.visitors = [];

    $scope.isAuthorized = function() {
      return (sessionStorage.currentUser !== undefined);
    };
    $scope.checkInput = function() {
      if(!$scope.newMessage) { return; }
      sendMessage($scope.newMessage);
      $scope.newMessage = '';
    };
    $scope.self = function() {
      return sessionStorage.currentUser;
    };

    var scrollToBottom = function() {
      $timeout(function() {
        $rootScope.$broadcast('event:scroll');
      });
    };
    var sendMessage = function(message) {
      var data = {content: message, author: $scope.self(), time: Date.now()};
      $scope.messages.push(data);
      MySocket.emit('message', data);
      scrollToBottom();
      Auth.startLeaving(false);
    };

    MySocket.on('visitors', function (activeUsers) {
      if ($scope.isAuthorized()) { $scope.visitors = activeUsers; }
    });
    MySocket.on('message', function (newMessage) {
      $scope.messages.push(newMessage);
      scrollToBottom();
    });
    MySocket.on('messages', function (recentMessages) {
      $scope.messages = recentMessages;
      scrollToBottom();
    });

  });