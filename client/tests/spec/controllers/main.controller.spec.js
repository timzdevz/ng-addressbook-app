'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('addressBookApp'));

  var createController,
    scope,
    q,
    deferred,
    EntrySvc;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    q = $q;
    scope = $rootScope.$new();

    EntrySvc = {
      addEntry: function() { deferred = q.defer(); return deferred.promise; },
      getEntries: function () {},
      removeEntry: function() { deferred = q.defer(); return deferred.promise; }
    };

    createController = function () {
      return $controller('MainCtrl', {
        $scope: scope,
        Entry: EntrySvc,
        toastr: {},
        $q: {}
      });
    };
  }));

  it('should get the list of entries from Entry.getEntries service method', function () {
    var entryMockList = [{name: 'entryName'}];
    spyOn(EntrySvc, 'getEntries').and.returnValue(entryMockList);
    createController();
    expect(scope.entries).toBe(entryMockList);
  });

  it('should remove the entry from the list when remove is called', function () {
    var myEntry = {name: 'myDummyEntry'};
    var entryMockList = [myEntry];

    createController();

    scope.entries = entryMockList;
    scope.removeEntry(myEntry);
    deferred.resolve();

    scope.$root.$digest();

    expect(scope.entries).not.toContain(myEntry);
  });

  it('should set initialize newEntry as empty object', function () {
    createController();
    expect(scope.newEntry).toEqual({});
  });

  it('should set editNewEntry to true when addNewEntry is called', function () {
    createController();
    scope.addNewEntry();
    expect(scope.editNewEntry).toBeTruthy();
  });

  it('should set editNewEntry to false and reset newEntry when addNewEntry is called', function () {
    createController();
    scope.newEntry = {notEmptyObj: true};
    scope.cancelNewEntry();
    expect(scope.editNewEntry).toBeFalsy();
    expect(scope.newEntry).toEqual({});
  });


  it('should add new entry to entries list when new entry has been successfully saved', function () {
    var resolvedMockEntry = {name: 'myDummyEntry'};

    createController();

    scope.entries = [];

    scope.saveNewEntry();
    deferred.resolve(resolvedMockEntry);

    scope.$root.$digest();

    expect(scope.entries).toContain(resolvedMockEntry);
  });

  it('should cancel new entry add when new entry has been successfully saved', function () {

    createController();
    scope.entries = [];
    spyOn(scope, 'cancelNewEntry');

    scope.saveNewEntry();
    deferred.resolve();

    scope.$root.$digest();

    expect(scope.cancelNewEntry).toHaveBeenCalled();
  });
});
