var User = require('../models/user.model');
var md5 = require('md5');

module.exports.login = function(req, res){
  res.clearCookie('userId');
  res.render('frontend/login', {
    categories: res.locals.categories,
    user: null
  });
}

module.exports.postLogin = async function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var savePassword = req.body.savePassword;
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
  var cookieOptions = {signed: true};
  if(savePassword){
    cookieOptions.maxAge = 24*3600*30*1000
  }
  
  res.cookie('userId', user.id, cookieOptions);
  res.redirect('/');
}