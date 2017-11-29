(function () {
  'use strict';

  angular
    .module('theaters')
    .controller('TheatersListController', TheatersListController);

  TheatersListController.$inject = ['TheatersService'];

  function TheatersListController(TheatersService) {
    var vm = this;

    vm.theaters = TheatersService.query();
  }
}());
