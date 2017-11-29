(function () {
  'use strict';

  angular
    .module('events.admin')
    .controller('EventCategoryAdminController', EventCategoryAdminController);

  EventCategoryAdminController.$inject = ['$scope', '$state', '$window', 'eventcategoryResolve', 'Authentication', 'Notification'];

  function EventCategoryAdminController($scope, $state, $window, eventcategory, Authentication, Notification) {
    var vm = this;

    vm.event = eventcategory;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Event
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.event.$remove(function () {
          $state.go('admin.events.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Event category deleted successfully!' });
        });
      }
    }

    // Save Event
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.eventcategoryForm');
        return false;
      }

      // Create a new event, or update the current instance
      vm.event.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.events.list'); // should we send the User to the list or the updated Event's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Event category saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Event save error!' });
      }
    }
  }
}());
