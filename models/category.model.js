var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new mongoose.Schema({
  name: {type: String, default: ""},
  childrenId: [{type: Schema.Types.ObjectId, ref: 'Category'}],
  description: {type: String, default: ""},
  createdDate: {type: String, default: ""},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  updatedDate: {type: String, default: ""},
  updatedBy: {type: Schema.Types.ObjectId, ref: 'User'},
  status: {type: Boolean, default: true},
});

var Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;