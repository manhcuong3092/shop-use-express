var User = require('../models/user.model');
var md5 = require('md5');

module.exports.register = function(req, res){
  res.render('frontend/register');
}

module.exports.postRegister = async function(req, res){
  var user = await User.findOne({username: req.body.username});
  if(user){
    res.render('frontend/register', {
      errors: ['This username already existed'],
      values: req.body
    });
    return;
  }
  user = {
    username: req.body.username,
    password: md5(req.body.password),
    permissions: {
      "manage_product" : [],
      "manage_category" : [],
      "manage_contact" : [],
      "manage_post" : [],
      "manage_blogcategory" : [],
      "manage_order" : [],
      "manage_user" : []
    },
    accessAdminTool: false
  }
  console.log(user)
  User.create(user);
  res.redirect('/login'); 
}