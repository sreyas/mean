(function () {
  'use strict';

  angular
    .module('events.admin')
    .controller('EventCategoryAdminListController', EventCategoryAdminListController);

  EventCategoryAdminListController.$inject = ['EventCategoryService'];

  function EventCategoryAdminListController(EventCategoryService) {
    var vm = this;
    vm.eventcategory = EventCategoryService.query();
  }
}());
