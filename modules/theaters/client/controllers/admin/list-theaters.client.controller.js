(function () {
  'use strict';

  angular
    .module('theaters.admin')
    .controller('TheatersAdminListController', TheatersAdminListController);

  TheatersAdminListController.$inject = ['TheatersService'];

  function TheatersAdminListController(TheatersService) {
    var vm = this;

    vm.theaters = TheatersService.query();
  }
}());
