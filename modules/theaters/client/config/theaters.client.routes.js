(function () {
  'use strict';

  angular
    .module('theaters.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('theaters', {
        abstract: true,
        url: '/theaters',
        template: '<ui-view/>'
      })
      .state('theaters.list', {
        url: '',
        templateUrl: '/modules/theaters/client/views/list-theaters.client.view.html',
        controller: 'TheatersListController',
        controllerAs: 'vm'
      })
      .state('theaters.view', {
        url: '/:theaterId',
        templateUrl: '/modules/theaters/client/views/view-theater.client.view.html',
        controller: 'TheatersController',
        controllerAs: 'vm',
        resolve: {
          theaterResolve: getTheater
        },
        data: {
          pageTitle: '{{ theaterResolve.title }}'
        }
      });
  }

  getTheater.$inject = ['$stateParams', 'TheatersService'];

  function getTheater($stateParams, TheatersService) {
    return TheatersService.get({
      theaterId: $stateParams.theaterId
    }).$promise;
  }
}());
