const Post = require('../../models/post.model');
const BlogCategory = require('../../models/blogCategory.model');
const date = require('date-and-time');

module.exports.getAllPosts = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_post.find(function(permission){
    return permission === 'view';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } else {
    var posts = await Post.find();
    for(let post of posts){
      post.category = await BlogCategory.findById(post.category.id);
    }
    res.render('backend/post/all-posts', {
      posts: posts
    });
  }
}

module.exports.getAddPost = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_post.find(function(permission){
    return permission === 'create';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } 
  var categories = await BlogCategory.find();
  res.render('backend/post/add-post', {
    categories: categories,
  }); 
}

module.exports.postAddPost = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_post.find(function(permission){
    return permission === 'create';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } 
  var user = res.locals.user;
  var now = new Date();
  var createdDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');

  var post = {
    title: req.body.title,
    category: {id: req.body.category},
    content: req.body.content,
    avatar: "",
    createdBy: {id: user.id},
    createdDate: createdDate
  };
  if(req.body.slug){
    post.slug = req.body.slug;
  }
  if(!req.body.status){
    post.status = false;
  }
  post.avatar = '/' + req.file.path.split('\\').slice(1).join('/');
  await Post.create(post);
  var categories = await BlogCategory.find();
  res.render('backend/post/add-post', {
    categories: categories,
    success: "Added Successfully"
  });
}

module.exports.deletePost = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_post.find(function(permission){
    return permission === 'delete';
  });
  if(!havePermission){
    res.render('backend/403');
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