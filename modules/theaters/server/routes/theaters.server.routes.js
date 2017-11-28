'use strict';

/**
 * Module dependencies
 */
var TheaterPolicy = require('../policies/theaters.server.policy'),
  Theater = require('../controllers/theaters.server.controller');

module.exports = function (app) {
  // Theater collection routes
  app.route('/api/theaters').all(TheaterPolicy.isAllowed)
    .get(Theater.list)
    .post(Theater.create);

  // Single Theater routes
  app.route('/api/theaters/:theaterId').all(TheaterPolicy.isAllowed)
    .get(Theater.read)
    .put(Theater.update)
    .delete(Theater.delete);

  // Finish by binding the Theater middleware
  app.param('theaterId', Theater.TheaterByID);
};
