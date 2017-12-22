(function (app) {
  'use strict';

  app.registerModule('events', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('events.admin', ['core.admin']);
  app.registerModule('events.admin.routes', ['core.admin.routes']);
  app.registerModule('events.services');
  app.registerModule('events.routes', ['ui.router', 'core.routes', 'events.services']);
}(ApplicationConfiguration));
