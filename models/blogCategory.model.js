var mongoose = require('mongoose');

var blogCategorySchema = new mongoose.Schema({
  name: {type: String, default: ""},
  description: {type: String, default: ""},
  createdDate: {type: String, default: ""},
  createdBy: {type: String, default: ""},
  updatedDate: {type: String, default: ""},
  updatedBy: {type: String, default: ""},
  status: {type: Boolean, default: true},
});

var BlogCategory = mongoose.model('Blogcategory', blogCategorySchema, 'blogcategories');

module.exports = BlogCategory;