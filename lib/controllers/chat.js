'use strict';
var _ = require('lodash'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var pushVisitors = function(socket) {
  User.find({isActive: true}, function (err, visitors) {
    socket.broadcast.emit('visitors', {activeUsers: visitors});
    socket.emit('visitors', {activeUsers: visitors});
  });
};
// send the user on connection
exports.initRoom = function(socket) {
  User.find({isActive: true}, function (err, visitors) {
    if (!err) {
      socket.emit('visitors', {activeUsers: visitors});
    } else {
      throw new Error('Failed to load User');
    }
  });
};
// update visitors list for everyone
exports.joinRoom = function(socket) {
  pushVisitors(socket);
};
// clean up when a user leaves, and broadcast to other users
exports.leaveRoom = function(socket, username) {
  User.findOne({name: username}, function (err, user) {
    user.isActive = false;
    user.save(function (err) {
      if(err) { console.error('ERROR!'); }
    });
  });
  pushVisitors(socket);
};

/*** Message Code

// only keep track of most recent messages
var messageQueue = (function(size){
  var queue = [];

  queue.push = function(a) {
    if(this.length >= size) this.shift();
    return Array.prototype.push.apply(this, arguments);
  };

  return queue;
})(15);

// broadcast user's message to other users
exports.sendMessage = function(socket, user, data) {
  messageQueue.push({
    author: user,
    body:   data.body,
    date:   Date.now()
  });
  socket.broadcast.emit('message', messageQueue);
};

***/