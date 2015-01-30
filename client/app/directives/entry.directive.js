'use strict';

angular.module('addressBookApp')
  .directive('entry', function () {
    return {
      templateUrl: 'app/partials/directives/entry.html',
      restrict: 'E',
      scope: true,
      replace: true,
      controller: function($scope) {
        $scope.editMode = false;

        $scope.editEntry = angular.copy($scope.entry);

        $scope.edit = function() {
          $scope.editMode = true;
        };

        $scope.cancel = function () {
          $scope.editMode = false;
        };

        $scope.remove = function () {
          $scope.removeEntry($scope.entry);
        };

        $scope.save = function() {
          $scope.saveEntry($scope.editEntry).then(function() {
            $scope.entry = $scope.editEntry;
            $scope.editMode = false;
          });
        };
      }
    };
  });
