'use strict';

angular.module('addressBookApp')
  .controller('MainCtrl', function ($scope, Entry, notifier, $q) {
    $scope.entries = Entry.getEntries();

    $scope.newEntry = {};

    $scope.addNewEntry = function() {
      $scope.editNewEntry = true;
    };

    $scope.cancelNewEntry = function() {
      $scope.editNewEntry = false;
      $scope.newEntry = {};
    };

    $scope.saveNewEntry = function () {
      Entry.addEntry($scope.newEntry).then(function(entry) {
        $scope.cancelNewEntry();
        $scope.entries.push(entry);
        notifier.notifyEntryAdd();
      }, function() {
        notifier.notifyUnknownError();
      });
    };

    $scope.removeEntry = function (entry) {
      Entry.removeEntry(entry).then(function () {
        _.pull($scope.entries, entry);
        notifier.notifyEntryRemove();
      }, function () {
        notifier.notifyUnknownError();
      });
    };

    $scope.saveEntry = function (entry) {
      return Entry.saveEntry(entry).then(
        function onSuccess() {
          notifier.notifyEntryUpdate();
        },

        function onError(res) {
          if (res.data && res.data.errors) {
            notifier.notifyEntryError(res.data.errors);
          } else {
            notifier.notifyUnknownError();
          }

          return $q.reject();
        }
      );
    };

  });
