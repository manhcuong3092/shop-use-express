var Product = require('../models/product.model');

module.exports.detail = async function(req, res){
  var productId = req.params.productId;
  var product = await Product.findById(productId);
  console.log(product);
  res.render('frontend/product-detail', {
    product: product
  });
}