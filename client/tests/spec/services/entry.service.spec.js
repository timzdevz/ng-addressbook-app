'use strict';

describe('Service: entrySvc', function () {

  beforeEach(module('addressBookApp'));

  var entrySvc,
      $httpBackend,
      $resource,
      EntryResource;

  beforeEach(inject(function (Entry, _$httpBackend_, _$resource_) {
    entrySvc = Entry;
    $httpBackend = _$httpBackend_;
    $resource = _$resource_;
    EntryResource =  $resource('/api/entries/:id', {id: '@_id'});
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should issue a GET request to /api/entries/ when getting entries', function () {
    var mockEntries = ['entry 1', 'entry 2', 'entry 3'];
    $httpBackend.when('GET', '/api/entries').respond(mockEntries);
    var entries = entrySvc.getEntries();
    $httpBackend.flush();

    expect(entries).toEqual(mockEntries);
  });

  it('should issue a POST request to /api/entries/:id when entry is edited', function () {
    var mockedEntry = new EntryResource({'_id': 23});

    $httpBackend.expectPOST('/api/entries/23').respond(200);
    entrySvc.saveEntry(mockedEntry);
    $httpBackend.flush();
  });

  it('should issue a DELETE request to /api/entries/:id when entry is removed ', function () {
    var mockedEntry = new EntryResource({'_id': 23});

    $httpBackend.expectDELETE('/api/entries/23').respond(204);
    entrySvc.removeEntry(mockedEntry);
    $httpBackend.flush();
  });

  it('should issue a POST request to /api/entries/ when new entry is saved', function () {
    var mockedEntryData = {name: 'dummyName'};

    $httpBackend.expectPOST('/api/entries').respond(201);
    entrySvc.addEntry(mockedEntryData);
    $httpBackend.flush();
  });
});
