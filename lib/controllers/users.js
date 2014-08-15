'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');
    // passport = require('passport');

/*** Create user */
exports.create = function (req, res, next) {
  console.log("did it get to create?");
  var newUser = new User(req.body);
  // newUser.provider = 'local';
  console.log("newasdf: ",newUser);
  newUser.save(function(err, newUser) {
    console.log("anywhere?---------");
    if (err) {
      console.log("error here: ",err);
      return res.json(400, err);
    }
    console.log("middle of it all: ",newUser);
    return res.json(newUser);
  });
};

// function(err, newUser) {
//     console.log("anywhere?---------");
//     if (err) {
//       console.log("error here: ",err);
//       return res.json(400, err);
//     }
//     console.log("middle of it all: ",newUser);
//     return res.json(newUser);
//   }

exports.check = function (req, res, next) {
  User.findOne( {name: req.params.name}, function (err, doc) {
    if (err) return next();
    if (doc) {
      console.log("loaded an exisiting user");
      res.send({ isActive: doc.isActive, isActuallyNew: false });
    } else {
      console.log("found out user does not exist");
      res.send({ isActuallyNew: true });
    }
  });
};

/**  Get profile of specified user */
exports.show = function (req, res, next) {
  console.log("---went to show insetad");
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

exports.showAll = function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) return next(new Error('Failed to load User'));
    res.send(users);
  });
};

/** Get current user*/
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

