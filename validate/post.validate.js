const BlogCategory = require('../models/blogCategory.model');
var permission = require('../permission/permission')

//validate required field of add post form
module.exports.validatePost = async function (req, res, next) {
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_post, 'create')){
    res.render('backend/403');
    return;
  }

  var error;
  var title = req.body.title;
  var category = req.body.category;
  var content = req.body.content;
  var slug = req.body.slug;
  var avatar = req.file;
  if (!title || !category || !content || !avatar) {
    error = 'You must fill in all the required field.';
  }
  if (error) {
    var categories = await BlogCategory.find();
    res.render('backend/post/add-post', {
      error: error,
      values: req.body,
      categories: categories
    });
    return;
  }
  next();
}

//validate required field of edit post form
module.exports.validateEditPost = async function (req, res, next) {
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_post, 'edit')){
    res.render('backend/403');
    return;
  }

  var error;
  var title = req.body.title;
  var category = req.body.category;
  var content = req.body.content;
  if (!title || !category || !content) {
    error = 'You must fill in all the required field.';
  }
  if (error) {
    var categories = await BlogCategory.find();
    res.render('backend/post/edit-post', {
      error: error,
      values: req.body,
      categories: categories
    });
    return;
  }
  next();
}