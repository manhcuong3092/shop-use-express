var User = require('../models/user.model');

module.exports.index = async function(req, res){
  var user = await User.findById(req.signedCookies.userId);
  res.render('frontend/user-infor', {
    user: user
  });
}

module.exports.postInfor = async function(req, res){
  var user = await User.findById(req.signedCookies.userId);
  if(req.file){
    req.body.avatar = '/' + req.file.path.split('\\').slice(1).join('/');
    user.avatar = req.body.avatar;
  }
  user.fullname = req.body.fullname;
  user.email = req.body.email;
  user.address = req.body.address;
  user.phoneNumber = req.body.phoneNumber;
  user.validatedInfor = true;
  await User.findByIdAndUpdate(req.signedCookies.userId, {$set: user});
  res.render('frontend/index', {
    user: user
  });
}