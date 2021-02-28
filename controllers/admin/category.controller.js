const Category = require('../../models/category.model');
const Product = require('../../models/product.model');
const date = require('date-and-time');

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
  if(!havePermission){
    res.render('backend/403');
    return;
  } else {
    res.render('backend/category/add-category');
  }
}

module.exports.postAddCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_category.find(function(permission){
    return permission === 'add';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } 

  var name = req.body.name;
  var description = req.body.description;
  var error, success;
  if(!name || !description){
    error = 'Please enter all field.'
  } else {
    var status = (req.body.status ? true : false)
    var now = new Date();
    var createdDate = date.format(now, 'YYYY-MM-DD HH-mm-ss');
    var createdBy = {id: user.id};
    var category = {
      name: name,
      description: description,
      status: status,
      createdDate: createdDate,
      createdBy: createdBy
    }
    await Category.create(category);
    success = 'Added successfully!'
  }
  res.render('backend/category/add-category', {
    success: success,
    error: error
  });
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