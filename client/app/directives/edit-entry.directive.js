'use strict';

angular.module('addressBookApp')
  .directive('editEntry', function () {
    return {
      templateUrl: 'app/partials/directives/edit-entry.html',
      restrict: 'E',
      scope: {
        entry: '=',
        save: '&',
        cancel: '&',
        saveBtnText: '@'
      },
      replace: true
    };
  });
