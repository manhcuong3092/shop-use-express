var Product = require('../models/product.model');
var Order = require('../models/order.model');
var Cart = require('../models/cart.model');
const date = require('date-and-time');

//function get checkout
module.exports.checkout = async function(req, res){
  var cart = req.signedCookies.cart;
  var totalPrice = 0;
  for(let item of cart.items){
    item.product = await Product.findById(item.product);
    if(item.product.salePrice){
      totalPrice += item.product.salePrice*item.quantity;
    } else {
      totalPrice += item.product.price*item.quantity;
    }
  }
  res.render('frontend/checkout', {
    cart: cart,
    totalPrice: totalPrice,
    user: res.locals.user
  });
}

//function to post order to db
module.exports.postOrder = async function(req, res){
  var cart = req.signedCookies.cart;
  var now = new Date();
  var createdDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');
  var totalPrice = 0;
  //calculate totalPrice
  for(let item of cart.items){
    item.product = await Product.findById(item.product);
    if(item.product.salePrice){
      totalPrice += item.product.salePrice*item.quantity;
    } else {
      totalPrice += item.product.price*item.quantity;
    }
  }
  var order = {
    userId: '',
    customer: {},
    items: cart.items,
    totalPrice: totalPrice,
    createdDate: createdDate
  }
  //if no item in cart, do not store to db
  if(cart.items.length === 0){
    res.render('frontend/checkout', {
      cart: cart,
      totalPrice: totalPrice,
      error: 'You must have at least 1 product in cart.'
    });
    return;
  }

  //handle order of user or guess
  if(req.signedCookies.userId){
    order.userId = req.signedCookies.userId;
    await Order.create(order);
    await Cart.findByIdAndUpdate(cart._id, {items: []});
    cart = {_id: cart._id, userId: req.signedCookies.userId, items: [], __v: 0}
    res.cookie('cart', cart, {
      signed: true
    });
  } else {
    var fullname = req.body.fullname;
    var address = req.body.address;
    var email = req.body.email;
    var phoneNumber = req.body.phoneNumber;
    var customer;
    if(fullname && address && email && phoneNumber){
      customer = {
        fullname: fullname,
        address: address,
        email: email,
        phoneNumber: phoneNumber
      }
    }
    //if all field filled
    if(customer){
      order.customer = customer;
      await Order.create(order);
      cart = {id: '', items: []}
      res.cookie('cart', cart, {
        signed: true,
        maxAge: 10*24*3600*1000
      });
    } else {
      res.render('frontend/checkout', {
        cart: cart,
        totalPrice: totalPrice,
        error: 'You must fill all your information.'
      });
      return;
    }
  }
  res.render('frontend/checkout', {
    cart: cart,
    totalPrice: 0,
    success: 'Your order has been received.'
  });
}