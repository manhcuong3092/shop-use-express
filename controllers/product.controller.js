var Product = require('../models/product.model');
var Category = require('../models/category.model');
var User = require('../models/user.model');
var Cart = require('../models/cart.model')

//Render product detail
module.exports.detail = async function(req, res){
  var productId = req.params.productId;
  var product = await Product.findById(productId);
  //find user commented
  for(let comment of product.comments){
    comment.user = await User.findById(comment.user.id);
  } 
  //find category
  category = await Category.findById(product.category.id);
  product.category = category;

  //render html
  res.render('frontend/product-detail', {
    product: product,
    user: res.locals.user,
    cart: res.locals.cart
  });
}

//get product and add to cart from ajax
module.exports.addToCart = async function(req, res){
  var productId = req.params.productId;
  var size = req.body.size;
  var color = req.body.color;
  var quantity = req.body.quantity;
  var product = {
    product: productId,
    size: size,
    color: color,
    quantity: quantity
  }
  try {
    var cart = req.signedCookies.cart;
    var productIndex = cart.items.findIndex(function(item){
      return item.product === product.product && item.size === product.size && item.color === product.color;
    });

    //if this product already in cart, color and size is the same, add quantity, else push to cart
    if(productIndex >= 0){
      cart.items[productIndex].quantity = cart.items[productIndex].quantity + product.quantity;
    } else {
      cart.items.push(product);
    }
    if(req.signedCookies.userId){
      await Cart.findByIdAndUpdate(cart._id, {items: cart.items});
    }
    res.cookie('cart', cart, {
      signed: true
    });
    for(let item of cart.items){
      item.product = await Product.findById(item.product);
    }
    //send ajax data
    res.status(200).send(JSON.stringify(cart));
  } catch(error){
    res.status(400).send(JSON.stringify(req.body));
  }
}