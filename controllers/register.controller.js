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
    password: md5(req.body.password)
  }
  User.create(user);
  res.redirect('/login'); 
}