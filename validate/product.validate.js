const Category = require('../models/category.model');
const permission = require('../permission/permission');

//validate required field of add product form
module.exports.validateAddProduct = async function (req, res, next) {
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_product, 'create')){
    res.render('backend/403');
    return;
  }

  var error;
  var name = req.body.name;
  var category = req.body.category;
  var price = parseFloat(req.body.price);
  var shortDescription = req.body.shortDescription;
  var detailDescription = req.body.detailDescription;
  var sizes = req.body.sizes;
  var colors = req.body.colors;
  var tags = req.body.tags;
  var avatar = req.files['avatar'];
  var images = req.files['images'];
  if (!name || !category || !price || !shortDescription || !detailDescription || !sizes.length || !colors.length || !tags.length || !avatar || !images.length) {
    error = 'You must fill in all the required field.';
  } else if (Number.isNaN(price) || price <= 0) {
    error = 'Price must be a number and greater than 0.';
  } else if (req.body.salePrice){
    if(Number.isNaN(parseFloat(req.body.salePrice))){
      error = 'Sale price must be a number and greater than 0.';
    }
  }
  if (error) {
    var categories = await Category.find();
    res.render('backend/product/add-product', {
      error: error,
      values: req.body,
      categories: categories
    });
    return;
  }
  next();
}

//validate required field of edit product form
module.exports.validateEditProduct = async function (req, res, next) {
  var user = res.locals.user;
    if(!permission.checkPermission(user.permissions.manage_product, 'edit')){
    res.render('backend/403');
    return;
  }

  var error;
  var name = req.body.name;
  var category = req.body.category;
  var price = parseFloat(req.body.price);
  var shortDescription = req.body.shortDescription;
  var detailDescription = req.body.detailDescription;
  var sizes = req.body.sizes;
  var colors = req.body.colors;
  var tags = req.body.tags;
  if (!name || !category || !price || !shortDescription || !detailDescription || !sizes.length || !colors.length || !tags.length) {
    error = 'You must fill in all the required field.';
  } else if (Number.isNaN(price) || price <= 0) {
    error = 'Price must be a number and greater than 0.';
  } else if (req.body.salePrice){
    if(Number.isNaN(parseFloat(req.body.salePrice))){
      error = 'Sale price must be a number and greater than 0.';
    }
  }
  if (error) {
    var categories = await Category.find();
    res.render('backend/product/edit-product', {
      error: error,
      values: req.body,
      categories: categories
    });
    return;
  }
  next();
}