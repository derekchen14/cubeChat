'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/*** Create user */
var createUser = function (user) {
  var newUser = new User(user);
  newUser.save();
  return {state: 'created'};
};
var enterUser = function(username) {
  User.findOne({name: username}, function (err, user) {
    user.isActive = true;
    user.save(function (err) {
      if(err) { console.error('ERROR!'); }
    });
  });
  return {state: 'entered'};
};
var checkActive = function(doc) {
  return doc.isActive ? {state: 'rejected'} : enterUser(doc.name);
};

/**  Allow a user to join chat **/
exports.join = function (req, res, next) {
  var username = req.body.name;
  User.findOne( {name: username}, function (err, doc) {
    if (err) return next();
    var joinState = !!doc ? checkActive(doc) : createUser(req.body);
    res.send(200, joinState);
  });
};

/**  Get profile of specified user */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(new Error('Failed to load User'));

    if (user) {
      res.send(user);
    } else {
      res.send(404, 'USER_NOT_FOUND');
    }
  });
};

exports.showActive = function (req, res, next) {
  User.find({isActive: true}, function (err, visitors) {
    if (err) return next(new Error('Failed to load User'));
    return res.send(visitors);
  });
};
exports.me = function(req, res) {
  res.json(req.user || null);
};
exports.changeProfile = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(500, err);

        return res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

