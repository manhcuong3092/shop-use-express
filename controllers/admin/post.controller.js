module.exports.getAllPosts = function(req, res){
  res.render('backend/post/all-posts');
}

module.exports.getAddPost = function(req, res){
  res.render('backend/post/add-post');
}