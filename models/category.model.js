var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name: {type: String, default: ""},
  childrenId: [String],
  description: {type: String, default: ""},
  createdDate: {type: String, default: ""},
  createdBy: {type: String, default: ""},
  updatedDate: {type: String, default: ""},
  updatedBy: {type: String, default: ""},
  status: {type: Boolean, default: true},
});

var Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;