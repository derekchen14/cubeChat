'use strict';
var _ = require('lodash'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var pushVisitors = function(socket) {
  User.find({isActive: true}, function (err, visitors) {
    socket.broadcast.emit('visitors', visitors);
    socket.emit('visitors', visitors);
  });
};
var pushMessages = function(socket) {
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

exports.joinRoom = function(socket) {
  pushVisitors(socket);
  pushMessages(socket);
};
exports.leaveRoom = function(socket, username) {
  console.log('username trying to logout: ', username);
  User.findOne({name: username}, function (err, user) {
    if (!err) {
      user.isActive = false;
      user.save(function (err) {
        if(err) { console.error('ERROR!'); }
        pushVisitors(socket);
      });
    }
  });
};
exports.sendMessage = function(socket, data) {
  User.findOne({name: data.author}, function(err, result) {
    result.messages.push({content: data.content, time: data.time});
    result.save(function (err, user) {
      if(err) { console.error('ERROR!'); }
      socket.broadcast.emit('message', data);
    });
  });
};