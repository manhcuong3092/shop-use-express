var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  salePrice: Number,
  shortDescription: String,
  detailDescription: String,
  images: [String],
  tags: [String],
  comments: [{user: String, rate: Number, content: String}],
  createdDate: String,
  createdBy: String,
  updatedDate: String,
  updatedBy: String,
  status: Boolean,
  seo: String
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;