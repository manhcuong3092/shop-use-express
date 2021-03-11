var Post = require('../models/post.model');
var BlogCategory = require('../models/blogCategory.model');

module.exports.getPost = async function(req, res){
  var postId = req.params.postId;
  var posts = await Post.find().populate('category');
  var postIndex = posts.findIndex(function(post){
    return post.id === postId;
  });
  
  var prevPost = (postIndex > 0) ? posts[postIndex-1] : null;
  var nextPost = (postIndex < posts.length - 1) ? posts[postIndex+1] : null;
  res.render('frontend/blog/blog-post', {
    categories: res.locals.categories,
    post: posts[postIndex],
    prevPost: prevPost,
    nextPost: nextPost,
    user: res.locals.user,
    cart: res.locals.cart
  });
}