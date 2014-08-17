'use strict';

angular.module('chatApp')
  .controller('ChatCtrl', function ($scope, MySocket, $rootScope, $timeout) {
    $scope.messages = [];
    $scope.visitors = [];

    $scope.isAuthorized = function() {
      return (sessionStorage.currentUser !== undefined);
    };
    $scope.sendMessage = function() {
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
      MySocket.emit( 'message', { body: message } );
      $scope.messages.push( { body: message, author: $rootScope.currentUser, date: Date.now() });
      scrollToBottom();
    };

    MySocket.on('visitors', function (data) {
      $scope.visitors = data.activeUsers;
    });
    MySocket.on('message', function (messageQueue) {
      $scope.messages = messageQueue;
      scrollToBottom();
    });

  });