(function (app) {
  'use strict';

  app.registerModule('Theater', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('Theater.admin', ['core.admin']);
  app.registerModule('Theater.admin.routes', ['core.admin.routes']);
  app.registerModule('Theater.services');
  app.registerModule('Theater.routes', ['ui.router', 'core.routes', 'Theater.services']);
}(ApplicationConfiguration));
