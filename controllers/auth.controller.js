var User = require('../models/user.model');
var md5 = require('md5');

module.exports.login = function(req, res){
  res.render('frontend/login');
}

module.exports.postLogin = async function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var user = await User.findOne({username: username});
  if(!user){
    res.render('/frontend/login', {
      error: 'Wrong username or password.'
    });
    return;
  }
  var hashedPassword = md5(password);
  if(user.password !== hashedPassword){
    res.render('frontend/login', {
      error: 'Wrong username or password.'
    });
    return;
  }
  res.cookie('userId', user.id, {
    signed: true
  });
  res.redirect('/');
}