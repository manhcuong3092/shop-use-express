//Render product detail
module.exports.getAllCategories = function(req, res){
  res.render('backend/blogcategory/all-blog-categories');
}

module.exports.getAddCategory = function(req, res){
  res.render('backend/blogcategory/add-blog-category');
}