var Product = require('../models/product.model');
var Category = require('../models/category.model');

module.exports.index = async function(req, res){
  var products = await Product.find();
  for(var product of products){
    category = await Category.findById(product.category.id);
    product.category = category;
  }
  res.render('frontend/shop', {
    products: products
  });
}