const BlogCategory = require('../models/blogCategory.model');

//validate required field of add post form
module.exports.validatePost = async function (req, res, next) {
  var user = res.locals.user;
  var havePermission = user.permission.manage_post.find(function(permission){
    return permission === 'add';
  });
  if(!havePermission){
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