const BlogCategory = require('../../models/blogCategory.model')
const Post = require('../../models/post.model')

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
  if(havePermission){
    res.render('backend/blogcategory/add-blog-category');
  } else {
    res.render('backend/403');
  }
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