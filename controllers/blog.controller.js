var Post = require('../models/post.model');
var BlogCategory = require('../models/blogCategory.model');

module.exports.index = async function(req, res){
  var posts = await Post.find().populate('category');
  res.render('frontend/blog/index', {
    categories: res.locals.categories,
    posts: posts,
    user: res.locals.user,
    cart: res.locals.cart
  });
}