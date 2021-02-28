const User = require('../../models//user.model');
const date = require('date-and-time');
const md5 = require('md5');

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

module.exports.postAddUser = async function(req, res){
  var user = res.locals.user;
  var now = new Date();
  var createdDate = date.format(now, 'YYYY-MM-DD HH-mm-ss');

  var user = {
    username: req.body.username,
    password: md5(req.body.password),
    email: req.body.email,
    fullname: req.body.fullname,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    role: req.body.role,
    avatar: "",
    accessAdminTool: false,
    permission: {
      manage_product : [],
      manage_category : [],
      manage_contact : [],
      manage_post : [],
      manage_blogcategory : [],
      manage_order : [],
      manage_user : []
    },
    createdBy: {id: user.id},
    createdDate: createdDate,
    status: true
  };
  if(req.body.accessAdminTool){
    user.accessAdminTool = true;
  }

  //set permissions of role
  if(req.body.role === 'author'){
    user.permission.manage_post = ['add'];
  } else if (req.body.role === 'editor') {
    user.permission.manage_product = ['view', 'add', 'edit'];
    user.permission.manage_product = ['view', 'add', 'edit'];
    user.permission.manage_category = ['view', 'add', 'edit'];
    user.permission.manage_post = ['view', 'add', 'edit'];
    user.permission.manage_blogcategory = ['view', 'add', 'edit'];
  } else if (req.body.role === 'manager') {
    user.permission.manage_product = ['view', 'add', 'edit', 'delete'];
    user.permission.manage_product = ['view', 'add', 'edit', 'delete'];
    user.permission.manage_category = ['view', 'add', 'edit', 'delete'];
    user.permission.manage_post = ['view', 'add', 'edit', 'delete'];
    user.permission.manage_blogcategory = ['view', 'add', 'edit', 'delete'];
    user.permission.manage_contact = ['view', 'delete', 'handle'],
    user.permission.manage_order = ['view', 'delete', 'handle'],
    user.permission.manage_user = ['view', 'add']
  } else if (req.body.role === 'administrator') {
    user.permission.manage_product = ['view', 'add', 'edit', 'delete'];
    user.permission.manage_product = ['view', 'add', 'edit', 'delete'];
    user.permission.manage_category = ['view', 'add', 'edit', 'delete'];
    user.permission.manage_post = ['view', 'add', 'edit', 'delete'];
    user.permission.manage_blogcategory = ['view', 'add', 'edit', 'delete'];
    user.permission.manage_contact = ['view', 'delete', 'handle'],
    user.permission.manage_order = ['view', 'delete', 'handle'],
    user.permission.manage_user = ['view', 'add', 'edit', 'delete']
  }
  user.avatar = '/' + req.file.path.split('\\').slice(1).join('/');
  await User.create(user);
  res.render('backend/user/add-user', {
    success: "Added Successfully"
  });
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