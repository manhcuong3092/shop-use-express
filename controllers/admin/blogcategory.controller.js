const BlogCategory = require('../../models/blogCategory.model')
const Post = require('../../models/post.model')
const date = require('date-and-time');
const mongoose = require('mongoose');

//Render product detail
module.exports.getAllCategories = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_blogcategory.find(function(permission){
    return permission === 'view';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var blogcategories = await BlogCategory.find()
    res.render('backend/blogcategory/all-blog-categories', {
      blogcategories: blogcategories
    });
  }
}

module.exports.getAddCategory = function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_blogcategory.find(function(permission){
    return permission === 'create';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } 
  res.render('backend/blogcategory/add-blog-category');
}

module.exports.postAddCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_blogcategory.find(function(permission){
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
      createdBy: mongoose.Types.ObjectId(user.id)
    }
    await BlogCategory.create(category);
    success = 'Added successfully!';
  }
  res.render('backend/blogcategory/add-blog-category', {
    success: success,
    error: error
  });
}

//get form edit blog category
module.exports.getEditBlogCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_blogcategory.find(function(permission){
    return permission === 'edit';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  }

  var categoryId = req.params.categoryId;
  var category = await BlogCategory.findById(categoryId).populate('createdBy updatedBy');
  res.render('backend/blogcategory/edit-blog-category', {
    category: category
  });
}

//update blog category
module.exports.postEditBlogCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_blogcategory.find(function(permission){
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
      updatedBy: mongoose.Types.ObjectId(user.id)
    }
    await BlogCategory.findByIdAndUpdate(categoryId, {$set: category});
    success = 'Edit successfully!'
  }
  var category = await BlogCategory.findById(categoryId).populate('createdBy updatedBy');
  res.render('backend/blogcategory/edit-blog-category', {
    category: category,
    success: success,
    error: error
  });
}

//delete blog category
module.exports.deleteBlogCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_blogcategory.find(function(permission){
    return permission === 'delete';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var blogCategoryId = req.params.blogCategoryId;
    var blogCategory = await BlogCategory.findByIdAndRemove(blogCategoryId);
    if(blogCategory){
      await Post.deleteMany({'category.id': blogCategory.id})
      res.status(200).send(JSON.stringify(blogCategory));
    } else {
      res.status(400).send('error');
    }
  }
}