'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Theater = mongoose.model('Theater'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an Theater
 */
exports.create = function (req, res) {
  var theater = new Theater(req.body);
  theater.user = req.user;

  theater.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(theater);
    }
  });
};

/**
 * Show the current theater
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var theater = req.theater ? req.theater.toJSON() : {};

  // Add a custom field to the Theater, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Theater model.
  theater.isCurrentUserOwner = !!(req.user && theater.user && theater.user._id.toString() === req.user._id.toString());

  res.json(theater);
};

/**
 * Update an theater
 */
exports.update = function (req, res) {
  var theater = req.theater;

  theater.title = req.body.title;
  theater.content = req.body.content;

  theater.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(theater);
    }
  });
};

/**
 * Delete an theater
 */
exports.delete = function (req, res) {
  var theater = req.theater;

  theater.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(theater);
    }
  });
};

/**
 * List of Theaters
 */
exports.list = function (req, res) {
  Theater.find().sort('-created').populate('user', 'displayName').exec(function (err, theater) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(theater);
    }
  });
};

/**
 * Theater middleware
 */
exports.theaterByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Theater is invalid'
    });
  }

  Theater.findById(id).populate('user', 'displayName').exec(function (err, theater) {
    if (err) {
      return next(err);
    } else if (!theater) {
      return res.status(404).send({
        message: 'No theater with that identifier has been found'
      });
    }
    req.theater = theater;
    next();
  });
};
