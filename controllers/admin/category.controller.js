const Category = require('../../models/category.model');
const Product = require('../../models/product.model');
const date = require('date-and-time');
const mongoose = require('mongoose');

//Render product detail
module.exports.getAllCategories = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_category.find(function(permission){
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

//get page add category
module.exports.getAddCategory = function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_category.find(function(permission){
    return permission === 'create';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } else {
    res.render('backend/category/add-category');
  }
}

//post form add category
module.exports.postAddCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_category.find(function(permission){
    return permission === 'create';
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
    var createdDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');
    var category = {
      name: name,
      description: description,
      status: status,
      createdDate: createdDate,
      createdBy: mongoose.Types.ObjectId(user.id),
    }
    await Category.create(category);
    success = 'Added successfully!'
  }
  res.render('backend/category/add-category', {
    success: success,
    error: error
  });
}

//get form edit category
module.exports.getEditCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_category.find(function(permission){
    return permission === 'edit';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } else {
    var categoryId = req.params.categoryId;
    var category = await Category.findById(categoryId).populate('createdBy updatedBy');
    res.render('backend/category/edit-category', {
      category: category
    });
  }
}

//update category
module.exports.postEditCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_category.find(function(permission){
    return permission === 'edit';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } 
  var categoryId = req.params.categoryId;
  var name = req.body.name;
  var description = req.body.description;
  var error, success;
  if(!name || !description){
    error = 'Please enter all required field.'
  } else {
    var status = (req.body.status ? true : false)
    var now = new Date();
    var updatedDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');
    var category = {
      name: name,
      description: description,
      status: status,
      updatedDate: updatedDate,
      updatedBy: mongoose.Types.ObjectId(user.id),
    }
    await Category.findByIdAndUpdate(categoryId, {$set: category});
    success = 'Edit successfully!'
  }
  var category = await Category.findById(categoryId).populate('createdBy updatedBy');
  res.render('backend/category/edit-category', {
    category: category,
    success: success,
    error: error
  });
}

//delete category
module.exports.deleteCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_category.find(function(permission){
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