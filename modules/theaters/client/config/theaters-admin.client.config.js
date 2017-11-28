(function () {
  'use strict';

  // Configuring the Theater Admin module
  angular
    .module('theater.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Theater',
      state: 'admin.Theater.list'
    });
  }
}());
