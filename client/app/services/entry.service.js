'use strict';

angular.module('addressBookApp')
  .factory('Entry', function ($resource) {
    var Entry = $resource('/api/entries/:id', {id: '@_id'});

    return {
      addEntry: function(entryData) {
        var entry = new Entry(entryData);
        return entry.$save();
      },

      getEntries: function() {
        return Entry.query();
      },

      saveEntry: function(entry) {
        return entry.$save();
      },

      removeEntry: function(entry) {
        return entry.$delete();
      }
    };
  });
