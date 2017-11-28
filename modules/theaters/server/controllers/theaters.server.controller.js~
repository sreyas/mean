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
  var Theater = new Theater(req.body);
  Theater.user = req.user;

  Theater.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(Theater);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var Theater = req.Theater ? req.Theater.toJSON() : {};

  // Add a custom field to the Theater, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Theater model.
  Theater.isCurrentUserOwner = !!(req.user && Theater.user && Theater.user._id.toString() === req.user._id.toString());

  res.json(Theater);
};

/**
 * Update an Theater
 */
exports.update = function (req, res) {
  var Theater = req.Theater;

  Theater.title = req.body.title;
  Theater.content = req.body.content;

  Theater.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(Theater);
    }
  });
};

/**
 * Delete an Theater
 */
exports.delete = function (req, res) {
  var Theater = req.Theater;

  Theater.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(Theater);
    }
  });
};

/**
 * List of Theater
 */
exports.list = function (req, res) {
  Theater.find().sort('-created').populate('user', 'displayName').exec(function (err, Theater) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(Theater);
    }
  });
};

/**
 * Theater middleware
 */
exports.TheaterByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Theater is invalid'
    });
  }

  Theater.findById(id).populate('user', 'displayName').exec(function (err, Theater) {
    if (err) {
      return next(err);
    } else if (!Theater) {
      return res.status(404).send({
        message: 'No Theater with that identifier has been found'
      });
    }
    req.Theater = Theater;
    next();
  });
};
