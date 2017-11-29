(function () {
  'use strict';

  angular
    .module('events')
    .controller('EventsController', EventsController);

  EventsController.$inject = ['$scope', 'eventResolve', 'Authentication'];

  function EventsController($scope, theater, Authentication) {
    var vm = this;

    vm.theater = theater;
    vm.authentication = Authentication;

  }
}());
