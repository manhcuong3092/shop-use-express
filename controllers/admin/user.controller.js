const User = require('../../models//user.model');

module.exports.getAllUsers = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_user.find(function(permission){
    return permission === 'view';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } else {
    var users = await User.find();
    res.render('backend/user/all-users',{
      users: users
    });
  }
}

module.exports.getAddUser = function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_user.find(function(permission){
    return permission === 'add';
  });
  if(havePermission){
    res.render('backend/user/add-user');
  } else {
    res.render('backend/403');
  }
}