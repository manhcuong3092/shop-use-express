const Category = require('../../models/category.model');
const Product = require('../../models/product.model');

//Render product detail
module.exports.getAllCategories = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_category.find(function(permission){
    return permission === 'view';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var categories = await Category.find()
    res.render('backend/category/all-categories', {
      categories: categories
    });
  }
}

module.exports.getAddCategory = function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_category.find(function(permission){
    return permission === 'add';
  });
  if(havePermission){
    res.render('backend/category/add-category');
  } else {
    res.render('backend/403');
  }
}

module.exports.deleteCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_category.find(function(permission){
    return permission === 'delete';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var categoryId = req.params.categoryId;
    var category = await Category.findByIdAndRemove(categoryId);
    if(category){
      await Product.deleteMany({'category.id': category.id})
      res.status(200).send(JSON.stringify(category));
    } else {
      res.status(400).send('error');
    }
  }
}