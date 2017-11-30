(function () {
  'use strict';

  angular
    .module('events.services')    
    .factory('EventsService', EventsService);
    
    angular
    .module('events.services')
    .factory('EventCategoryService', EventCategoryService);
    

  EventsService.$inject = ['$resource', '$log'];
  EventCategoryService.$inject = ['$resource', '$log'];
  
    function EventCategoryService($resource, $log) {
    var EventCategory = $resource('/api/eventcategory/:eventcategoryId', {
      eventcategoryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(EventCategory.prototype, {
      createOrUpdate: function () {
        var eventcategory = this;
        return createOrUpdate(eventcategory);
      }
    });

    return EventCategory;

    function createOrUpdate(eventcategory) {
      if (eventcategory._id) {
        return eventcategory.$update(onSuccess, onError);
      } else {
        return eventcategory.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(eventcategory) {
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
  function EventsService($resource, $log) {
    var Event = $resource('/api/events/:eventId', {
      eventId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Event.prototype, {
      createOrUpdate: function () {
        var event = this;
        return createOrUpdate(event);
      }
    });

    return Event;

    function createOrUpdate(event) {
      if (event._id) {
        return event.$update(onSuccess, onError);
      } else {
        return event.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(event) {
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
