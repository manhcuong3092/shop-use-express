const permission = require('../permission/permission');

//validate required field of add post form
module.exports.validateUser = async function (req, res, next) {
  var user = res.locals.user;
    if(!permission.checkPermission(user.permissions.user, 'create')){
    res.render('backend/403');
    return;
  }

  var error;
  var username = req.body.username;
  var password = req.body.password;
  var fullname = req.body.fullname;
  var email = req.body.email;
  var address = req.body.address;
  var phone = req.body.phoneNumber;
  var role = req.body.role;
  var avatar = req.file;
  
  if (!username || !password || !fullname || !email || !phone || !address || !role || !avatar) {
    error = 'You must fill in all the required field.';
  } else if (password.length < 6){
    error = 'Length of password must be greater than 5.';
  } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
    error = 'Invalid email.';
  }
  if (error) {
    res.render('backend/user/add-user', {
      error: error,
      values: req.body,
    });
    return;
  }
  next();
}

//validate required field of edit post form
module.exports.validateEditUser = async function (req, res, next) {
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.user, 'edit')){
    res.render('backend/403');
    return;
  }

  var error;
  var username = req.body.username;
  var password = req.body.password;
  var fullname = req.body.fullname;
  var email = req.body.email;
  var address = req.body.address;
  var phone = req.body.phoneNumber;
  var role = req.body.role;
  
  if (!username || !password || !fullname || !email || !phone || !address || !role) {
    error = 'You must fill in all the required field.';
  } else if (password.length < 6){
    error = 'Length of password must be greater than 5.';
  } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
    error = 'Invalid email.';
  }
  if (error) {
    res.render('backend/user/edit-user', {
      error: error,
      values: req.body,
    });
    return;
  }
  next();
}