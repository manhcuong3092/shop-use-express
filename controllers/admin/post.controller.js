const Post = require('../../models/post.model');
const BlogCategory = require('../../models/blogCategory.model');
const User = require('../../models/user.model');
const date = require('date-and-time');
const mongoose = require('mongoose');
const permission = require('../../permission/permission');

//render posts tabledata
module.exports.getAllPosts = async function(req, res){
  var user = res.locals.user;
  var posts;
  if(!permission.checkPermission(user.permissions.manage_post, 'view')){
    res.status(403).render('backend/403');
    return;
  } else {
    if(req.params.userId){
      posts = await Post.find({createdBy: req.params.userId}).populate('category');
    } else {
      posts = await Post.find().populate('category');
    }
    console.log(posts);
    res.render('backend/post/all-posts', {
      user: res.locals.user,
      posts: posts
    });
  }
}

//render add post form
module.exports.getAddPost = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_post, 'create')){
    res.status(403).render('backend/403');
    return;
  } 
  var categories = await BlogCategory.find();
  res.render('backend/post/add-post', {
    user: res.locals.user,
    categories: categories,
  }); 
}

//get form and store to db
module.exports.postAddPost = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_post, 'create')){
    res.status(403).render('backend/403');
    return;
  } 
  var user = res.locals.user;
  var now = new Date();
  var createdDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');

  var post = {
    title: req.body.title,
    category: mongoose.Types.ObjectId(req.body.category),
    content: req.body.content,
    avatar: "",
    createdBy: mongoose.Types.ObjectId(user.id),
    createdDate: createdDate,
    slug: req.body.slug
  };
  if(!req.body.status){
    post.status = false;
  }
  post.avatar = '/' + req.file.path.split('\\').slice(1).join('/');
  await Post.create(post);
  var categories = await BlogCategory.find();
  res.render('backend/post/add-post', {
    user: res.locals.user,
    categories: categories,
    success: "Added Successfully"
  });
}

//show edit form
module.exports.getEditPost = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_post, 'edit')){
    res.status(403).render('backend/403');
    return;
  } 
  var categories = await BlogCategory.find();
  var postId = req.params.postId;
  var post = await Post.findById(postId).populate('category createdBy updatedBy');
  res.render('backend/post/edit-post', {
    user: res.locals.user,
    post: post,
    categories: categories,
  }); 
}

//update post
module.exports.postEditPost = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_post, 'edit')){
    res.status(403).render('backend/403');
    return;
  } 
  var now = new Date();
  var updatedDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');
  var postId = req.params.postId;
  var post = await Post.findById(postId);
  
  post.title = req.body.title;
  post.category = mongoose.Types.ObjectId(req.body.category),
  post.content = req.body.content;
  post.slug = req.body.slug;
  post.updatedDate = updatedDate;
  post.updatedBy = mongoose.Types.ObjectId(user.id);
  post.slug = req.body.slug;
  if(req.file){
    post.avatar = '/' + req.file.path.split('\\').slice(1).join('/');
  }

  var categories = await BlogCategory.find();
  post = await Post.findByIdAndUpdate(postId, {$set: post}).populate('category createdBy updatedBy');
  res.render('backend/post/edit-post', {
    user: res.locals.user,
    post: post,
    categories: categories,
    success: "Edit Product Successfully"
  }); 
}

//delete post
module.exports.deletePost = async function(req, res){
  if(!permission.checkPermission(user.permissions.manage_post, 'delete')){
    res.status(403).render('backend/403');
  } else {
    var postId = req.params.postId;
    var post = await Post.findByIdAndRemove(postId);
    if(post){
      res.status(200).send(JSON.stringify(post));
    } else {
      res.status(400).send('error');
    }
  }
}