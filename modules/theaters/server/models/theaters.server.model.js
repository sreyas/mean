'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

/**
 * Theater Schema
 */
var TheaterSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
  city: {
    type: String,
    default: '',
    trim: true,
  }
   state: {
    type: String,
    default: '',
    trim: true,
  }
   country: {
    type: String,
    default: '',
    trim: true,
  }
   address: {
    type: String,
    default: '',
    trim: true,
  }
    address1: {
    type: String,
    default: '',
    trim: true,
  }
  phone: {
    type: String,
    default: '',
    trim: true,
  }
    postal_code: {
    type: String,
    default: '',
    trim: true,
  }
});

TheaterSchema.statics.seed = seed;

mongoose.model('Theater', TheaterSchema);

/**
* Seeds the User collection with document (Theater)
* and provided options.
*/
function seed(doc, options) {
  var Theater = mongoose.model('Theater');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(findAdminUser)
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function findAdminUser(skip) {
      var User = mongoose.model('User');

      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve(true);
        }

        User
          .findOne({
            roles: { $in: ['admin'] }
          })
          .exec(function (err, admin) {
            if (err) {
              return reject(err);
            }

            doc.user = admin;

            return resolve();
          });
      });
    }

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Theater
          .findOne({
            title: doc.title
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove Theater (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Theater\t' + doc.title + ' skipped')
          });
        }

        var Theater = new Theater(doc);

        Theater.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Theater\t' + theater.title + ' added'
          });
        });
      });
    }
  });
}
