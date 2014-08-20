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
  User.find({isActive: true}, function (err, activeUsers) {
    if (!err) {
      socket.emit('visitors', activeUsers);
    } else {
      throw new Error('Failed to load User');
    }
  });
  var yesterday = Date.now() - (1000*60*60*24);
  User.find({'messages.time': {$gte: yesterday}}, function (err, users) {
    var extractMessages = function(all, user){
      var recents = user.messages.filter(function(message) {
        return message.time > yesterday;
      });
      recents.forEach(function(m){
        var message = m.toObject(); // neccesary because 'm' is a Mongo Document
        message.author = user.name; // object and not a plain JS object
        all.push(message);
      });
      return all;
    };
    var recentMessages = users.reduce(extractMessages, []);
    recentMessages.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.time) - new Date(b.time);
    });
    socket.emit('messages', recentMessages);
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
      pushVisitors(socket);
    });
  });
};
// broadcast user's message to other users
exports.sendMessage = function(socket, data) {
  User.findOne({name: data.author}, function(err, result) {
    result.messages.push({content: data.content, time: data.time});
    result.save(function (err, user) {
      if(err) { console.error('ERROR!'); }
      console.log('Success: ', data);
      socket.broadcast.emit('message', data);
    });
  });
};

/*** Message Code

var messageQueue = (function(size){
  var queue = [];
  queue.push = function(a) {
    if(this.length >= size) this.shift();
    return Array.prototype.push.apply(this, arguments);
  };
  return queue;
})(15);
***/