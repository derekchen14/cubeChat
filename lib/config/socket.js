var express = require('express'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    chatCtrl = require('../controllers/chat');

module.exports = function (io, app, expressConfig) {
  io.set('log level', 1); // reduce logging
  io.sockets.on('connection', function (socket) {
    chatCtrl.initRoom(socket);

    socket.on('message', function(data) {
      chatCtrl.sendMessage(socket, data);
    });
    socket.on('joining', function(state) {
      chatCtrl.joinRoom(socket);
    });
    socket.on('leaving', function(data) {
      chatCtrl.leaveRoom(socket, data.name);
    });
  });
};