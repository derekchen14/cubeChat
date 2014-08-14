'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    // messages = require('./controllers/messages'),
    chat = require('./controllers/chat');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.post('/api/users', users.create);
  app.get('/api/users/:id', users.show);
  app.put('/api/users', users.changeProfile);
  app.get('/api/users/me', users.me);

  // app.post('/api/session', session.login);
  // app.del('/api/session', session.logout);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};
