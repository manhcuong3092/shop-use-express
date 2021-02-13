var Product = require('../models/product.model');
var Tag = require('../models/tag.model');
var Category = require('../models/category.model');
var User = require('../models/user.model');

//Render product detail
module.exports.detail = async function(req, res){
  var productId = req.params.productId;
  var product = await Product.findById(productId);
  //find tags of product
  for(let i = 0; i < product.tags.length; i++){
    product.tags[i] = await Tag.findById(product.tags[i]);
  }
  //find user commented
  for(let comment of product.comments){
    comment.user = await User.findById(comment.user.id);
    console.log(comment)
  }
  //find category
  category = await Category.findById(product.category.id);
  product.category = category;

  //render html
  res.render('frontend/product-detail', {
    product: product,
  });
}