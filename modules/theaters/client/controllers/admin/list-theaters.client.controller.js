(function () {
  'use strict';

  angular
    .module('Theater.admin')
    .controller('TheaterAdminListController', TheaterAdminListController);

  TheaterAdminListController.$inject = ['TheaterService'];

  function TheaterAdminListController(TheaterService) {
    var vm = this;

    vm.Theater = TheaterService.query();
  }
}());
