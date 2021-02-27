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

module.exports.deleteUser = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_user.find(function(permission){
    return permission === 'delete';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var userId = req.params.userId;
    var user = await User.findByIdAndRemove(userId);
    if(user){
      res.status(200).send(JSON.stringify(user));
    } else {
      res.status(400).send('error');
    }
  }
}