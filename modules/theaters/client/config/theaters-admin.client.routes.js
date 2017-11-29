(function () {
  'use strict';

  angular
    .module('theaters.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.theaters', {
        abstract: true,
        url: '/theaters',
        template: '<ui-view/>'
      })
      .state('admin.theaters.list', {
        url: '',
        templateUrl: '/modules/theaters/client/views/admin/list-theaters.client.view.html',
        controller: 'TheatersAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.theaters.create', {
        url: '/create',
        templateUrl: '/modules/theaters/client/views/admin/form-theater.client.view.html',
        controller: 'TheaterAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
         theaterResolve: newTheater
        }
      })
      .state('admin.theaters.edit', {
        url: '/:theaterId/edit',
        templateUrl: '/modules/theaters/client/views/admin/form-theater.client.view.html',
        controller: 'TheaterAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ theaterResolve.title }}'
        },
        resolve: {
          theaterResolve: getTheater
        }
      });
  }

  getTheater.$inject = ['$stateParams', 'TheatersService'];

  function getTheater($stateParams, TheatersService) {
    return TheatersService.get({
      theaterId: $stateParams.theaterId
    }).$promise;
  }

  newTheater.$inject = ['TheatersService'];

  function newTheater(TheatersService) {
    return new TheatersService();
  }
}());
