module.exports.index = function(req, res){
  res.render('frontend/index');
}

module.exports.post = function(req, res){
  res.render('frontend/blog/post');
}