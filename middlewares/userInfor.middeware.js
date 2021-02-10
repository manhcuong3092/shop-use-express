const User = require('../models/user.model');

module.exports.validateInfor = async function(req, res, next){
  if(!req.signedCookies.userId){
    next();
  }

  User.findById(req.signedCookies.userId)
  var user = await User.findById(req.signedCookies.userId);
  console.log(user);
  if(!user){  
    res.redirect('/login');
    return;
  }
  if(!user.validatedInfor){
    res.redirect('/user-infor');
    return;
  }
  // res.locals.user = user;
  next();
}