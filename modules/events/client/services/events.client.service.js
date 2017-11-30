(function () {
  'use strict';
 var myApp = angular.module('events.services', ['ngResource']);
 myApp.factory('EventsService', ['$resource', function ($resource) {

return $resource('/api/events/:eventId', {
      eventId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
   
}]);
myApp.factory('EventCategoryService', ['$resource', function ($resource) {


    
    // Github REST API
    return $resource('https://api.github.com/meta');
}]);

}());
