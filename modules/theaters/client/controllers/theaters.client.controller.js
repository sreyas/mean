(function () {
  'use strict';

  angular
    .module('theaters')
    .controller('TheatersController', TheatersController);

  TheatersController.$inject = ['$scope', 'theaterResolve', 'Authentication'];

  function TheatersController($scope, theater, Authentication) {
    var vm = this;

    vm.theater = theater;
    vm.authentication = Authentication;

  }
}());
