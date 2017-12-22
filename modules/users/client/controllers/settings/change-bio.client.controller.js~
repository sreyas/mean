(function () {
  'use strict';

  angular
    .module('users')
    .controller('ChangeBioController', ChangeBioController);

  ChangeBioController.$inject = ['$scope', '$http', '$location', 'UsersService', 'Authentication', 'Notification'];

  function ChangeBioController($scope, $http, $location, UsersService, Authentication, Notification) {
    var vm = this;

    vm.user = Authentication.user;
    vm.updateUserBio = updateUserBio;

    // Update a user bio
    function updateUserBio(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.bioForm');

        return false;
      }

      var user = new UsersService(vm.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.bioForm');
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Edit bio successful!' });
        Authentication.user = response;
      }, function (response) {
        Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Edit bio failed!' });
      });
    }
  }
}());
