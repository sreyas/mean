(function () {
  'use strict';

  // Configuring the Events Admin module
  angular
    .module('events.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Events',
      state: 'admin.events.list'
    });
     Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Event Categories',
      state: 'admin.eventcategory.list'
    });
  }
}());
