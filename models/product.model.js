var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: {type: String, default: ""},
  category: {type: Object, default: {id: ''}},
  price: {type: Number, default: 0},
  salePrice: {type: Number, default: 0},
  shortDescription: {type: String, default: ""},
  detailDescription: {type: String, default: ""},
  images: [{type: String, default: ""}],
  tags: [{type: String, default: ""}],
  comments: [Object],
  createdDate: {type: String, default: ""},
  createdBy: {type: String, default: ""},
  updatedDate: {type: String, default: ""},
  updatedBy: {type: String, default: ""},
  status: {type: String, default: true},
  seo: {type: String, default: ""}
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;