const BlogCategory = require('../../models/blogCategory.model')
const Post = require('../../models/post.model')
const date = require('date-and-time');

//Render product detail
module.exports.getAllCategories = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_blogcategory.find(function(permission){
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
  var havePermission = user.permission.manage_blogcategory.find(function(permission){
    return permission === 'add';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } 
  res.render('backend/blogcategory/add-blog-category');
}

module.exports.postAddCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_blogcategory.find(function(permission){
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
    await BlogCategory.create(category);
    success = 'Added successfully!';
  }
  res.render('backend/blogcategory/add-blog-category', {
    success: success,
    error: error
  });
}

module.exports.deleteBlogCategory = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_blogcategory.find(function(permission){
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