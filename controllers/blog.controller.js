var Post = require('../models/post.model');

module.exports.index = async function(req, res){
  var posts = await Post.find();
  res.render('frontend/blog/index', {
    posts: posts
  });
}