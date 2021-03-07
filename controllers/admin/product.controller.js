const Product = require('../../models/product.model');
const Category = require('../../models/category.model');
const User = require('../../models/user.model');
const date = require('date-and-time');
const mongoose = require('mongoose');
const permission = require('../../permission/permission');

//Render all product
module.exports.getAllProducts = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_product, 'view')){
    res.render('backend/403');
    return;
  }
  var products = await Product.find().populate('category');
  res.render('backend/product/all-products', {
    products: products
  });
}

//render add product page
module.exports.getAddProduct = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_product, 'add')){
    res.render('backend/403');
    return;
    
  }
  var categories = await Category.find();
  res.render('backend/product/add-product', {
    categories: categories
  });
}

//post form data add product
module.exports.postAddProduct = async function(req, res){
  var user = res.locals.user;
  var now = new Date();
  var createdDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');

  var product = {
    name: req.body.name,
    category: mongoose.Types.ObjectId(req.body.category),
    price: parseFloat(req.body.price),
    shortDescription: req.body.shortDescription,
    detailDescription: req.body.detailDescription,
    sizes: req.body.sizes,
    colors: req.body.colors,
    tags: req.body.tags,
    avatar: "",
    images: [],
    createdBy: mongoose.Types.ObjectId(user.id),
    createdDate: createdDate,
    seo: req.body.seo
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

//Render edit product page
module.exports.getEditProduct = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_product, 'edit')){
    res.render('backend/403');
    return;
    
  }
  var productId = req.params.productId;
  var product = await Product.findById(productId).populate('category createdBy updatedBy');
  var categories = await Category.find();
  res.render('backend/product/edit-product', {
    product: product,
    categories: categories
  });
}

//post form data edit product
module.exports.postEditProduct = async function(req, res){
  var user = res.locals.user;
  var now = new Date();
  var updatedDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');
  var productId = req.params.productId;
  var product = await Product.findById(productId);

  product.name = req.body.name;
  product.category=  mongoose.Types.ObjectId(req.body.category);
  product.price = parseFloat(req.body.price);
  product.shortDescription = req.body.shortDescription;
  product.detailDescription = req.body.detailDescription;
  product.sizes = req.body.sizes;
  product.colors = req.body.colors;
  product.tags = req.body.tags;
  product.updatedBy = mongoose.Types.ObjectId(user.id);
  product.updatedDate = updatedDate;
  product.seo = req.body.seo

  if(req.body.salePrice){
    product.salePrice = parseFloat(req.body.salePrice)
  }
  if(req.files){
    if(req.files.avatar){
      product.avatar = '/' + req.files['avatar'][0].path.split('\\').slice(1).join('/');
    }
    if(req.files.images){
      for(let i = 0; i < req.files.images.length; i++){
        image = '/' + req.files.images[i].path.split('\\').slice(1).join('/');
        product.images.push(image);
      }
    } 
  }
  product = await Product.findByIdAndUpdate(productId, {$set: product}).populate('category createdBy updatedBy');

  var categories = await Category.find();
  res.render('backend/product/edit-product', {
    product: product,
    categories: categories,
    success: "Edit Product Successfully"
  });
}

//deleta a product
module.exports.deleteProduct = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_product, 'delete')){
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

//delete an image of product
module.exports.deleteImageProduct = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_product.find(function(permission){
    return permission === 'delete';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var productId = req.params.productId;
    var imageId = req.params.imageId;
    var product = await Product.findById(productId);
    var index = product.images.findIndex(function(image){
      return image.indexOf(imageId) > 0;
    });
    if (index !== -1) {
      product.images.splice(index, 1);
      await Product.findByIdAndUpdate(productId, {$set: product})
      res.status(200).send(JSON.stringify(product));
    } else {
      res.status(400).send('error');
    }
  }
}