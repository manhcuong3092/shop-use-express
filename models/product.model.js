var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: {type: String, default: ""},
  category: {type: Object, default: {id: ''}},
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
  createdBy: {type: Object, default: {}},
  updatedDate: {type: String, default: ""},
  updatedBy: {type: Object, default: {}},
  status: {type: String, default: true},
  seo: {type: String, default: ""}
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;