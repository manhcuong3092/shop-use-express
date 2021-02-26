module.exports.getAllUsers = function(req, res){
  res.render('backend/user/all-users');
}

module.exports.getAddUser = function(req, res){
  res.render('backend/user/add-user');
}