const User = require('../../models//user.model');
const date = require('date-and-time');
const md5 = require('md5');
const permission = require('../../permission/permission');

module.exports.getAllUsers = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_user, 'view')){
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
  if(!permission.checkPermission(user.permissions.manage_user, 'add')){
    res.render('backend/user/add-user');
  } else {
    res.render('backend/403');
  }
}

module.exports.postAddUser = async function(req, res){
  var user = res.locals.user;
  var now = new Date();
  var createdDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');

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
    permissions: {
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
    user.permissions.manage_post = ['create'];
  } else if (req.body.role === 'editor') {
    user.permissions.manage_product = ['view', 'create', 'edit'];
    user.permissions.manage_product = ['view', 'create', 'edit'];
    user.permissions.manage_category = ['view', 'create', 'edit'];
    user.permissions.manage_post = ['view', 'create', 'edit'];
    user.permissions.manage_blogcategory = ['view', 'create', 'edit'];
  } else if (req.body.role === 'manager') {
    user.permissions.manage_product = ['view', 'create', 'edit', 'delete'];
    user.permissions.manage_product = ['view', 'create', 'edit', 'delete'];
    user.permissions.manage_category = ['view', 'create', 'edit', 'delete'];
    user.permissions.manage_post = ['view', 'create', 'edit', 'delete'];
    user.permissions.manage_blogcategory = ['view', 'create', 'edit', 'delete'];
    user.permissions.manage_contact = ['view', 'delete', 'handle'],
    user.permissions.manage_order = ['view', 'delete', 'handle'],
    user.permissions.manage_user = ['view', 'create']
  } else if (req.body.role === 'administrator') {
    user.permissions.manage_product = ['view', 'create', 'edit', 'delete'];
    user.permissions.manage_product = ['view', 'create', 'edit', 'delete'];
    user.permissions.manage_category = ['view', 'create', 'edit', 'delete'];
    user.permissions.manage_post = ['view', 'create', 'edit', 'delete'];
    user.permissions.manage_blogcategory = ['view', 'create', 'edit', 'delete'];
    user.permissions.manage_contact = ['view', 'delete', 'handle'],
    user.permissions.manage_order = ['view', 'delete', 'handle'],
    user.permissions.manage_user = ['view', 'create', 'edit', 'delete']
  }
  user.avatar = '/' + req.file.path.split('\\').slice(1).join('/');
  await User.create(user);
  res.render('backend/user/add-user', {
    success: "Added Successfully"
  });
}

module.exports.getEditUser = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_user, 'edit')){
    res.render('backend/403');
    return;
  } else {
    var userEditId = req.params.userEditId;
    userEdit = await User.findById(userEditId).populate('createdBy updatedBy');
    res.render('backend/user/edit-user', {
      userEdit: userEdit
    });
  }
}

module.exports.postEditUser = function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_user.find(function(permission){
    return permission === 'edit';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } else {
    res.render('backend/user/edit-user');
  }
}


module.exports.deleteUser = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_user, 'delete')){
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