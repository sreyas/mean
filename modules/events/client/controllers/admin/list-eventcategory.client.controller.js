(function () {
  'use strict';

  angular
    .module('events.admin')
    .controller('EventCategoryAdminListController', EventCategoryAdminListController);

  EventCategoryAdminListController.$inject = ['EventsService'];

  function EventCategoryAdminListController(EventsService) {
    var vm = this;
    vm.eventcategory = EventsService.query();
  }
}());
