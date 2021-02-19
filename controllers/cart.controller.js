const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

//function to get information of cart
module.exports.getCart = async function(req, res){
  var items = req.signedCookies.cart.items;
  for(let item of items){
    item.product = await Product.findById(item.product);
  }
  var totalCart = 0;
  for(let item of items){
    totalCart += item.product.salePrice * item.quantity;
  }
  // console.log(items);
  res.render('frontend/cart', {
    items: items,
    totalCart: totalCart
  });
}

//fuction to handle change about a item of cart
module.exports.changeCart = async function(req, res){
  var productId = req.body.productId;
  var size = req.body.size;
  var quantity = req.body.quantity;
  var product = {
    product: productId,
    size: size,
    quantity: quantity
  }

  try {
    var cart = req.signedCookies.cart;
    var productIndex = cart.items.findIndex(function(item){
      return item.product === product.product && item.size === product.size;
    });

    if(productIndex >= 0){
      cart.items[productIndex].quantity =  product.quantity;
    } else {
      res.status(400).send(JSON.stringify(req.body));
    }
    if(req.signedCookies.userId){
      await Cart.findByIdAndUpdate(cart._id, {items: cart.items});
      return;
    }
    res.cookie('cart', cart, {
      signed: true
    });
    console.log('Success');
    console.log(cart);
    res.status(200).send(JSON.stringify(req.body));
  } catch(error){
    res.status(400).send(JSON.stringify(req.body));
  }
}

//function to get information of cart
module.exports.getCartData = async function(req, res){
  var cart = req.signedCookies.cart;
  for(let item of cart.items){
    item.product = await Product.findById(item.product);
  }
  if(cart){
    res.status(200).send(JSON.stringify(cart));
  } else {
    res.status(400).send('error');
  }
}

//delete item in cart
module.exports.deleteItem = async function(req, res){
  var cart = req.signedCookies.cart;
  var productInfor = req.params.productInfor
  var productId = productInfor.slice(0, productInfor.indexOf('&&'));
  var size = productInfor.slice(productInfor.indexOf('&&') + 2, productInfor.length);
  var productIndex = cart.items.findIndex(function(item){
    return item.product === productId && item.size === size;
  });
  if(productIndex >= 0){
    cart.items.splice(productIndex, 1);
  } else {
    res.status(400).send('error');
  }
  var cookieOptions = {signed: true};
  if(!req.signedCookies.userId){
    cookieOptions.maxAge = 3600*24*30;
  }
  res.cookie('cart', cart, cookieOptions);
  var totalPrice = 0;
  for(let item of cart.items){
    item.product = await Product.findById(item.product);
    totalPrice += item.product.salePrice;
  }
  var data = {
    numberOfItems: cart.items.length,
    totalPrice: totalPrice
  }
  res.status(200).send(JSON.stringify(data));
}