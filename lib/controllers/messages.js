'use strict';

var mongoose = require('mongoose'),
    Msg = mongoose.model('Message');
    // passport = require('passport');

/*** Create msg */
exports.create = function (req, res, next) {
  var newMsg = new Msg(req.body);
  newMsg.provider = 'local';

  console.log(req.body);
  newMsg.save(function(err) {
    if (err) return res.json(400, err);

    req.logIn(newMsg, function(err) {
      if (err) return next(err);

      return res.json(req.user.userInfo);
    });
  });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  Msg.findById(userId, function (err, user) {
    if (err) return next(new Error('Failed to load User'));

    if (user) {
      res.send({ profile: user.profile });
    } else {
      res.send(404, 'USER_NOT_FOUND');
    }
  });
};