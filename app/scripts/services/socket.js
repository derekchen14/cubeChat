/* global io */
'use strict';

angular.module('chatApp')
  .factory('MySocket', function(socketFactory) {
    var socket = io.connect();

    var wrappedSocket = socketFactory({
      ioSocket: socket
    });

    wrappedSocket.reconnect = function() {
      if(socket.socket.connected) {
        socket.socket.disconnect();
        socket.socket.connect();
      } else {
        socket.socket.connect();
      }
    };

    wrappedSocket.disconnect = function() {
      socket.socket.disconnect();
    };

    wrappedSocket.connect = function() {
      socket.socket.connect();
    };

    return wrappedSocket;
  });
