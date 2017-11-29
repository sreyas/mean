(function () {
  'use strict';

  angular
    .module('events.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
    .state('admin.eventcategory', {
        abstract: true,
        url: '/eventcategory',
        template: '<ui-view/>'
      })
       .state('admin.eventcategory.list', {
        url: '/category',
        templateUrl: '/modules/events/client/views/admin/list-eventcategory.client.view.html',
        controller: 'EventCategoryAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.eventcategory.create', {
        url: '/create',
        templateUrl: '/modules/events/client/views/admin/form-eventcategory.client.view.html',
        controller: 'EventCategoryAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
         eventcategoryResolve: newEventCategory
        }
      })
      .state('admin.eventcategory.edit', {
        url: '/:eventcategoryId/edit',
        templateUrl: '/modules/events/client/views/admin/form-eventcategory.client.view.html',
        controller: 'EventCategoryAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ eventcategoryResolve.title }}'
        },
        resolve: {
          eventcategoryResolve: getEventCategory
        }
      })
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
    function getEventCategory($stateParams, EventsService) {
    return EventsService.get({
      eventcategoryId: $stateParams.eventcategoryId
    }).$promise;
  }

  newEvent.$inject = ['EventsService'];

  function newEvent(EventsService) {
    return new EventsService();
  }
   function newEventCategory(EventsService) {
    return new EventsService();
  }
}());
