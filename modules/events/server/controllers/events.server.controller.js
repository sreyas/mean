'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  EventCategory = mongoose.model('EventCategory')
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an Event
 */
exports.create = function (req, res) {
  var event = new Event(req.body);
  event.user = req.user;

  event.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};



/**
 * Show the current event
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var event = req.event ? req.event.toJSON() : {};

  // Add a custom field to the Event, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Event model.
  event.isCurrentUserOwner = !!(req.user && event.user && event.user._id.toString() === req.user._id.toString());

  res.json(event);
};

/**
 * Update an event
 */
exports.update = function (req, res) {
  var event = req.event;

  event.title = req.body.title;
  event.content = req.body.content;

  event.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};

/**
 * Delete an event
 */
exports.delete = function (req, res) {
  var event = req.event;

  event.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};

/**
 * List of Events
 */
exports.list = function (req, res) {
  Event.find().sort('-created').populate('user', 'displayName').exec(function (err, event) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};

/**
 * Event middleware
 */
exports.eventByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Event is invalid'
    });
  }

  Event.findById(id).populate('user', 'displayName').exec(function (err, event) {
    if (err) {
      return next(err);
    } else if (!event) {
      return res.status(404).send({
        message: 'No event with that identifier has been found'
      });
    }
    req.event = event;
    next();
  });
};

/**
 * Create an Event Category
 */
 exports.create = function (req, res) {
  var eventcategory = new EventCategory(req.body);
  eventcategory.user = req.user;

  eventcategory.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(eventcategory);
    }
  });
};
/**
 * Show the current event Category
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var eventcategory = req.eventcategory ? req.eventcategory.toJSON() : {};

  // Add a custom field to the Event, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Event model.
  eventcategory.isCurrentUserOwner = !!(req.user && eventcategory.user && eventcategory.user._id.toString() === req.user._id.toString());

  res.json(eventcategory);
};
/**
 * Update an Event Category
 */
exports.update = function (req, res) {
  var eventcategory = req.eventcategory;

  eventcategory.title = req.body.title;

  eventcategory.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(eventcategory);
    }
  });
};
/**
 * Delete an Event Category
 */
exports.delete = function (req, res) {
  var eventcategory = req.eventcategory;

  eventcategory.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(eventcategory);
    }
  });
  
  /**
 * List of Events Category
 */
exports.list = function (req, res) {
  EventCategory.find().sort('-created').populate('user', 'displayName').exec(function (err, eventcategory) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(eventcategory);
    }
  });
};
};


/**
 * Event category middleware
 */
exports.eventcategoryByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Event Category is invalid'
    });
  }

  EventCategory.findById(id).populate('user', 'displayName').exec(function (err, eventcategory) {
    if (err) {
      return next(err);
    } else if (!eventcategory) {
      return res.status(404).send({
        message: 'No event category with that identifier has been found'
      });
    }
    req.eventcategory = eventcategory;
    next();
  });
};
