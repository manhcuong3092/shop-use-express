const Product = require('../../models/product.model');
const Category = require('../../models/category.model');
const date = require('date-and-time');

//Render all product
module.exports.getAllProducts = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_product.find(function(permission){
    return permission === 'view';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  }
  var products = await Product.find();
  for(let product of products){
    product.category = await Category.findById(product.category.id)
  }
  res.render('backend/product/all-products', {
    products: products
  });
}

module.exports.getAddProduct = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_product.find(function(permission){
    return permission === 'add';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
    
  }
  var categories = await Category.find();
  res.render('backend/product/add-product', {
    categories: categories
  });
}

module.exports.postAddProduct = async function(req, res){
  var user = res.locals.user;
  var now = new Date();
  var createdDate = date.format(now, 'YYYY-MM-DD HH-mm-ss');

  var product = {
    name: req.body.name,
    category: {id: req.body.category},
    price: parseFloat(req.body.price),
    shortDescription: req.body.shortDescription,
    detailDescription: req.body.detailDescription,
    sizes: req.body.sizes,
    colors: req.body.colors,
    tags: req.body.tags,
    avatar: "",
    images: [],
    createdBy: {id: user.id},
    createdDate: createdDate
  };
  if(req.body.salePrice){
    product.salePrice = parseFloat(req.body.salePrice)
  }
  product.avatar = '/' + req.files['avatar'][0].path.split('\\').slice(1).join('/');
  for(let i = 0; i < req.files.images.length; i++){
    image = '/' + req.files.images[i].path.split('\\').slice(1).join('/');
    product.images.push(image);
  }
  await Product.create(product);
  var categories = await Category.find();
  res.render('backend/product/add-product', {
    categories: categories,
    success: "Added Successfully"
  });
}

module.exports.deleteProduct = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_product.find(function(permission){
    return permission === 'delete';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var productId = req.params.productId;
    var product = await Product.findByIdAndRemove(productId);
    if(product){
      res.status(200).send(JSON.stringify(product));
    } else {
      res.status(400).send('error');
    }
  }
}