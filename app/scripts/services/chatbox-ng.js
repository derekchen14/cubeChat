'use strict';

angular.module('chatApp')
  .factory('ChatBox', function (MySocket, $rootScope, $timeout) {
    var messages = [];
    var visitors = [];

    // asynchronously trigger scroll to bottom
    var scrollToBottom = function() {
      $timeout(function() {
        $rootScope.$broadcast('event:scroll');
      });
    };

    MySocket.on('visitors', function (data) {
      console.log("All acive users: ", data.activeUsers);
      visitors = data.activeUsers;
    });

    // update messages and scroll to bottom
    MySocket.on('message', function (messageQueue) {
      messages = messageQueue;
      scrollToBottom();
    });

    // Public API here
    return {
      getMessages: function() {
        return messages;
      },
      getVisitors: function() {
        return visitors;
      },
      sendMessage: function(message) {
        MySocket.emit( 'message', { body: message } );
        // push message locally
        messages.push( { body: message, author: $rootScope.currentUser, date: Date.now() });
        scrollToBottom();
      }
    };
  });
