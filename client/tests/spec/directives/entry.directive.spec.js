'use strict';

describe('Directive: entry', function () {

  beforeEach(module('addressBookApp'));
  beforeEach(module('app/partials/directives/entry.html'));
  beforeEach(module('app/partials/directives/edit-entry.html'));

  var scope,
      deferred;

  beforeEach(inject(function ($rootScope, $compile, $q) {
    var element = angular.element('<entry></enrty>');
    $compile(element)($rootScope.$new());
    $rootScope.$digest();

    element.controller('entry');
    scope = element.scope();
    scope.saveEntry = function() { deferred = $q.defer(); return deferred.promise; };
  }));


  it('should set edit mode to true when edit entry is called', function () {
    scope.edit();

    expect(scope.editMode).toBeTruthy();
  });

  it('should set edit mode to false when edit has been canceled', function () {
    scope.cancel();

    expect(scope.editMode).toBeFalsy();
  });

  it('should set edit mode to false when entry has been saved', function() {
    scope.editMode = true;

    scope.save();
    deferred.resolve();

    scope.$root.$digest();
    expect(scope.editMode).toBeFalsy();
  });

  it('should call parent scope saveEntry with scope.editEntry', function () {
    scope.editEntry = {};
    spyOn(scope, 'saveEntry').and.callThrough();
    scope.save();
    expect(scope.saveEntry).toHaveBeenCalledWith(scope.editEntry);
  });
});
