(function (window) {
  'use strict';

  var applicationModuleName = 'mean';

  var service = {
    applicationEnvironment: window.env,
    applicationModuleName: applicationModuleName,
   // applicationModuleVendorDependencies: ['ngMaterial'],
 applicationModuleVendorDependencies: ['ngResource', 'ngMessages',
        'ngAnimate', 'ui.router',
        'ui.bootstrap', 'ui.utils', 'ngMaterial'
    ],
    registerModule: registerModule
  };

  window.ApplicationConfiguration = service;

  // Add a new vertical module
  function registerModule(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);   
    //angular.module( 'mean', [ 'ngMaterial' ] )
    //angular.module('ngMaterial', ["ng","ngAnimate","ngAria"]);

  }


  // Angular-ui-notification configuration
  angular.module('ui-notification').config(function (NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 2000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'bottom'
    });
  });
}(window));
