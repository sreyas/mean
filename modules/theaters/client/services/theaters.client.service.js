(function () {
  'use strict';

  angular
    .module('Theater.services')
    .factory('TheaterService', TheaterService);

  TheaterService.$inject = ['$resource', '$log'];

  function TheaterService($resource, $log) {
    var Theater = $resource('/api/Theater/:TheaterId', {
      TheaterId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Theater.prototype, {
      createOrUpdate: function () {
        var Theater = this;
        return createOrUpdate(Theater);
      }
    });

    return Theater;

    function createOrUpdate(Theater) {
      if (Theater._id) {
        return Theater.$update(onSuccess, onError);
      } else {
        return Theater.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(Theater) {
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
