'use strict';

/**
 * Module dependencies
 */
var theatersPolicy = require('../policies/theaters.server.policy'),
  theaters = require('../controllers/theaters.server.controller');

module.exports = function (app) {
  // Theaters collection routes
  app.route('/api/theaters').all(theatersPolicy.isAllowed)
    .get(theaters.list)
    .post(theaters.create);

  // Single theater routes
  app.route('/api/theaters/:theaterId').all(theatersPolicy.isAllowed)
    .get(theaters.read)
    .put(theaters.update)
    .delete(theaters.delete);

  // Finish by binding the theater middleware
  app.param('theaterId', theaters.theaterId);
};
