'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    // messages = require('./controllers/messages'),
    chat = require('./controllers/chat');

var mid = require('./middleware');

module.exports = function(app) {

  // Server API Routes
  app.post('/api/users', users.join);
  app.get('/api/users/:id', users.show);
  app.put('/api/users', users.changeProfile);
  app.get('/api/users', users.showActive);
  app.get('/api/users/me', users.me);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', mid.dle , index.index);
};
