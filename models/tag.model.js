var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdDate: String,
  createdBy: String,
  updatedDate: String,
  updatedBy: String,
  status: Boolean,
});

var Tag = mongoose.model('Tag', tagSchema, 'tags');

module.exports = Tag;