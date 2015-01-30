'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EntrySchema = new Schema({
  name: {
    type: String,
    required: 'Name is required!'
  },
  phone: String
});

module.exports = mongoose.model('Entry', EntrySchema);
