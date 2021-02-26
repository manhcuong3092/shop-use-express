//Render product detail
module.exports.getAllProducts = function(req, res){
  res.render('backend/product/all-products');
}

module.exports.getAddProduct = function(req, res){
  res.render('backend/product/add-product');
}