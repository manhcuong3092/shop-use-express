//Render product detail
module.exports.getAllCategories = function(req, res){
  res.render('backend/category/all-categories');
}

module.exports.getAddCategory = function(req, res){
  res.render('backend/category/add-category');
}