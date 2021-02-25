var Post = require('../models/post.model');
var BlogCategory = require('../models/blogCategory.model');

module.exports.index = async function(req, res){
  var posts = await Post.find();
  for(var post of posts){
    post.category = await BlogCategory.findById(post.category.id);
  }
  res.render('frontend/blog/index', {
    posts: posts,
    user: res.locals.user,
    cart: res.locals.cart
  });
}