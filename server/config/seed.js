/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Entry = require('../api/entry/entry.model');


Entry.find({}).remove(function() {
  Entry.create({
    name : 'Anton Ivanov',
    phone : ''
  }, {
    name : 'Maksim Ivanov',
    phone : '+7 (911) 995-21-56'
  }, {
    name : 'Ivan Ivanov',
    phone : '+7 (915) 412-67-11'
  });
});
