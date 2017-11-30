(function () {
  'use strict';
 var myApp = angular.module('events.services', ['ngResource']);
 myApp.factory('EventsService', ['$resource', function ($resource) {


    
    // Github REST API
    return $resource('https://api.github.com/gists');
}]);
myApp.factory('EventCategoryService', ['$resource', function ($resource) {


    
    // Github REST API
    return $resource('https://api.github.com/meta');
}]);

}());
