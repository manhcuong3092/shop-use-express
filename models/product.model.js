var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
  name: {type: String, default: ""},
  category: {type: Schema.Types.ObjectId, ref: 'Category', defaulut: null},
  price: {type: Number, default: 0},
  salePrice: {type: Number, default: 0},
  shortDescription: {type: String, default: ""},
  detailDescription: {type: String, default: ""},
  colors: [{type: String, default: ""}],
  sizes: [{type: String, default: ""}],
  avatar: {type: String, default: ""},
  images: [{type: String, default: ""}],
  tags: [{type: String, default: ""}],
  comments: [Object],
  createdDate: {type: String, default: ""},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User', defaulut: null},
  updatedDate: {type: String, default: ""},
  updatedBy: {type: Schema.Types.ObjectId, ref: 'User', defaulut: null},
  status: {type: String, default: true},
  seo: {type: String, default: ""}
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;