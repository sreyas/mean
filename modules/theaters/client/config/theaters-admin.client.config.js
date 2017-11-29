(function () {
  'use strict';

  // Configuring the Theaters Admin module
  angular
    .module('theaters.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Theaters',
      state: 'admin.theaters.list'
    });
  }
}());
