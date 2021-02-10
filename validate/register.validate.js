module.exports.postRegister = function(req, res, next){
  var errors = [];
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  if(!username || !password || !confirmPassword) {
    errors.push('Name, password and comfirm password is required.');
  } else if (username.length < 6 || password.length < 6 || confirmPassword.length < 6){
    errors.push('Minimum length of username and password is 6 characters.');
  } else if(req.body.password !== req.body.confirmPassword){
    errors.push('Password and confirm password must be the same.')
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