(function () {
  'use strict';

  angular
    .module('events.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.events', {
        abstract: true,
        url: '/events',
        template: '<ui-view/>'
      })
      .state('admin.events.list', {
        url: '',
        templateUrl: '/modules/events/client/views/admin/list-events.client.view.html',
        controller: 'EventsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
     .state('admin.eventcategory.list', {
        url: '/category',
        templateUrl: '/modules/events/client/views/admin/list-events.client.view.html',
        controller: 'EventsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.events.create', {
        url: '/create',
        templateUrl: '/modules/events/client/views/admin/form-event.client.view.html',
        controller: 'EventAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
         eventResolve: newEvent
        }
      })
      .state('admin.events.edit', {
        url: '/:eventId/edit',
        templateUrl: '/modules/events/client/views/admin/form-event.client.view.html',
        controller: 'EventAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ eventResolve.title }}'
        },
        resolve: {
          eventResolve: getEvent
        }
      });
  }

  getEvent.$inject = ['$stateParams', 'EventsService'];

  function getEvent($stateParams, EventsService) {
    return EventsService.get({
      eventId: $stateParams.eventId
    }).$promise;
  }

  newEvent.$inject = ['EventsService'];

  function newEvent(EventsService) {
    return new EventsService();
  }
}());
