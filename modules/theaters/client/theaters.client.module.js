(function (app) {
  'use strict';

  app.registerModule('theaters', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('theaters.admin', ['core.admin']);
  app.registerModule('theaters.admin.routes', ['core.admin.routes']);
  app.registerModule('theaters.services');
  app.registerModule('theaters.routes', ['ui.router', 'core.routes', 'theaters.services']);
}(ApplicationConfiguration));
