(function () {
  'use strict';

  angular
    .module('theaters')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Theaters',
      state: 'theaters',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'theaters', {
      title: 'List Theaters',
      state: 'articles.list',
      roles: ['*']
    });
  }
}());
