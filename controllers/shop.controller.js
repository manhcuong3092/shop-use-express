var Product = require('../models/product.model');
var Category = require('../models/category.model');

module.exports.index = async function(req, res){
  var products = await Product.find().populate('category');
  res.render('frontend/shop', {
    products: products,
    user: res.locals.user,
    cart: res.locals.cart
  });
}