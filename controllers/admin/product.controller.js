const Product = require('../../models/product.model');
const Category = require('../../models/category.model');

//Render all product
module.exports.getAllProducts = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_product.find(function(permission){
    return permission === 'view';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  }
  var products = await Product.find();
  for(let product of products){
    product.category = await Category.findById(product.category.id)
  }
  res.render('backend/product/all-products', {
    products: products
  });
}

module.exports.getAddProduct = function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_product.find(function(permission){
    return permission === 'add';
  });
  if(havePermission){
    res.render('backend/product/add-product');
  } else {
    res.render('backend/403');
  }
}

module.exports.deleteProduct = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_product.find(function(permission){
    return permission === 'delete';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var productId = req.params.productId;
    var product = await Product.findByIdAndRemove(productId);
    if(product){
      res.status(200).send(JSON.stringify(product));
    } else {
      res.status(400).send('error');
    }
  }
}