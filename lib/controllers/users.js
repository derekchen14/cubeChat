'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/*** Create user */
var createUser = function (user) {
  console.log("found out user does not exist and creating");
  var newUser = new User(user);
  newUser.save(function(err, newUser) {
    if (!err) {
      console.log("bz: ",newUser);
    } else {
      console.log("az: ",err);
    }
  });
  return {state: 'created'};
};
var enterUser = function(username) {
  console.log("loaded an exisiting user and entering");
  User.findOne({name: username}, function (err, user) {
    user.isActive = true;
    user.save(function (err) {
      if(err) { console.error('ERROR!'); }
    });
  });
  return {state: 'entered'};
};
var checkActive = function(doc) {
  console.log("went into check active");
  console.log("doc state should say false:", doc.isActive);
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
// exports.check = function (req, res, next) {
//   User.findOne( {name: req.params.name}, function (err, doc) {
//     if (err) return next();
//     if (doc) {
//       console.log("loaded an exisiting user");
//       res.send({ isActive: doc.isActive, isActuallyNew: false });
//     } else {
//       console.log("found out user does not exist");
//       res.send({ isActuallyNew: true });
//     }
//   });
// };

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

exports.showActive = function (req, res, next) {
  User.find({isActive: true}, function (err, visitors) {
    if (err) return next(new Error('Failed to load User'));
    console.log(visitors);
    return res.send(visitors);
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

