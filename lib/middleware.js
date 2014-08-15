'use strict';

module.exports = {
  dle: function(req, res, next) {
    console.log('Derek is the best!');
    next();
  }
};