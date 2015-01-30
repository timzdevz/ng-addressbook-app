'use strict';

angular.module('addressBookApp')
  .factory('notifier', function (toastr) {

    return {
      notifyEntryAdd: function () {
        toastr.success('Entry successfully added.');
      },

      notifyEntryUpdate: function () {
        toastr.success('Entry successfully updated.');
      },

      notifyEntryRemove: function() {
        toastr.success('Entry successfully removed.');
      },

      notifyEntryError: function(errors) {
        toastr.error(_.map(errors, 'message').join('. '));
      },

      notifyUnknownError: function() {
        toastr.error('Unknown server error. Please, try again later.');
      }
    };
  });
