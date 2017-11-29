(function () {
  'use strict';

  angular
    .module('eventcategory.admin')
    .controller('EventCategoryAdminListController', EventCategoryAdminListController);

  EventCategoryAdminListController.$inject = ['EventsService'];

  function EventCategoryAdminListController(EventsService) {
    var vm = this;
    vm.events = EventsService.query();
  }
}());
