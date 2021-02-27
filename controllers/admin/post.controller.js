var Post = require('../../models/post.model');
var BlogCategory = require('../../models/blogCategory.model');

module.exports.getAllPosts = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_post.find(function(permission){
    return permission === 'view';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } else {
    var posts = await Post.find();
    for(let post of posts){
      post.category = await BlogCategory.findById(post.category.id);
    }
    res.render('backend/post/all-posts', {
      posts: posts
    });
  }
}

module.exports.getAddPost = function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_post.find(function(permission){
    return permission === 'add';
  });
  if(havePermission){
    res.render('backend/post/add-post');
  } else {
    res.render('backend/403');
  }
}