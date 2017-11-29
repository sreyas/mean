(function () {
  'use strict';

  angular
    .module('theaters.services')
    .factory('TheatersService', TheatersService);

  TheatersService.$inject = ['$resource', '$log'];

  function TheatersService($resource, $log) {
    var Theater = $resource('/api/theaters/:theaterId', {
      theaterId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Theater.prototype, {
      createOrUpdate: function () {
        var theater = this;
        return createOrUpdate(theater);
      }
    });

    return Theater;

    function createOrUpdate(theater) {
      if (theater._id) {
        return theater.$update(onSuccess, onError);
      } else {
        return theater.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(theater) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
