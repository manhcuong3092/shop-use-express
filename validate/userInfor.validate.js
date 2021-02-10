module.exports.postRegister = function(req, res, next){
  var errors = [];
  var fullname = req.body.fullname;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  var address = req.body.address;
  var avatar = req.body.avatar;
  if(!fullname || !email || !phoneNumber || !address) {
    errors.push('You must fill in all the required field.');
  }
  if(errors.length) {
      res.render('frontend/register', {
          errors: errors,
          values: req.body
      });
      return;
  }
  next();
}