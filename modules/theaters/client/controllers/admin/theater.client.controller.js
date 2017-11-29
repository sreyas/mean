(function () {
  'use strict';

  angular
    .module('theaters.admin')
    .controller('TheaterAdminController', TheaterAdminController);

  TheaterAdminController.$inject = ['$scope', '$state', '$window', 'theaterResolve', 'Authentication', 'Notification'];

  function TheaterAdminController($scope, $state, $window, theater, Authentication, Notification) {
    var vm = this;

    vm.theater = theater;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Theater
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.theater.$remove(function () {
          $state.go('admin.theaters.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Theater deleted successfully!' });
        });
      }
    }

    // Save Theater
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.theaterForm');
        return false;
      }

      // Create a new theater, or update the current instance
      vm.theater.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.theaters.list'); // should we send the User to the list or the updated Theater's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Theater saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Theater save error!' });
      }
    }
  }
}());
