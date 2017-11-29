'use strict';

/**
 * Module dependencies
 */
var eventsPolicy = require('../policies/events.server.policy'),
  eventcategory = require('../controllers/events.server.controller'),
  events = require('../controllers/events.server.controller');
 

module.exports = function (app) {
  // Events collection routes
  app.route('/api/events').all(eventsPolicy.isAllowed)
    .get(events.list)
    .post(events.create);

  // Single event routes
  app.route('/api/events/:eventId').all(eventsPolicy.isAllowed)
    .get(events.read)
    .put(events.update)
    .delete(events.delete);

  // Finish by binding the event middleware
  app.param('eventId', events.eventByID);
  
   app.route('/api/events').all(eventsPolicy.isAllowed)
    .get(events.list)
    .post(events.create);

  // Single event routes
  app.route('/api/events/:eventId').all(eventsPolicy.isAllowed)
    .get(events.read)
    .put(events.update)
    .delete(events.delete);

  // Finish by binding the event middleware
  app.param('eventId', events.eventByID);
  
  app.route('/api/eventcategory').all(eventsPolicy.isAllowed)
    .get(eventcategory.list)
    .post(eventcategory.create);
    
     app.route('/api/eventcategory/:eventcategoryId').all(eventsPolicy.isAllowed)
    .get(eventcategory.read)
    .put(eventcategory.update)
    .delete(eventcategory.delete);
      // Finish by binding the event middleware
  app.param('eventcategoryId', eventcategory.eventcategoryByID);
  
   app.route('/api/eventcategory').all(eventsPolicy.isAllowed)
    .get(eventcategory.list)
    .post(eventcategory.create);
    
//app.param('eventcategoryId', eventcategory.eventcategoryByID);

};
