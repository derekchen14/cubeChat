var express = require('express'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    chatCtrl = require('../controllers/chat');

module.exports = function (io, app, expressConfig) {
  io.set('log level', 1); // reduce logging
  io.sockets.on('connection', function (socket) {
    // var user = socket.handshake.user;
    // console.log('User from socket.handshake: ', user);
    chatCtrl.initRoom(socket);

    socket.on('message', function(data) {
      chatCtrl.sendMessage(socket, data);
    });
    socket.on('joining', function(state) {
      console.log(state);
      chatCtrl.joinRoom(socket);
    });
    socket.on('leaving', function(data) {
      console.log("gets to the leaving portion", data);
      chatCtrl.leaveRoom(socket, data.name);
    });
  });
};