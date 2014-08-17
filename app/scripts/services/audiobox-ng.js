'use strict';

angular.module('chatApp')
  .factory('AudioBox', function (MySocket, $rootScope, $timeout, $location) {
    var messages = [];
    var visitors = [];

    // asynchronously trigger scroll to bottom
    var scrollToBottom = function() {
      $timeout(function() {
        $rootScope.$broadcast('event:scroll');
      });
      console.log($location.toString());
    };

/**
    // set currentUser to socket user
    MySocket.on('init', function (data) {
      $rootScope.currentUser = data.user;
    });

    // if unauthorized, reset messages and redirect to sign-up
    MySocket.on('unauthorized', function (data) {
      messages = data.messages;
      $location.path('/signup');
    });

    // update chatroom data
    MySocket.on('join', function (data) {
      messages = data.messages;
      scrollToBottom();
    });

    // update visitors
    MySocket.on('leave', function (data) {
      visitors = data.visitors;

      // if user closed connection somewhere else
      // reconnect to see if he's still logged in
      if(data.user._id === $rootScope.currentUser._id) {
        MySocket.reconnect();
      }
    });

    // update messages and scroll to bottom
    MySocket.on('message', function (messageQueue) {
      messages = messageQueue;
      scrollToBottom();
    });

    */
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
