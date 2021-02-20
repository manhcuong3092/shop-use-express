const { signedCookie } = require('cookie-parser');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

//function to get cart of user or customer
module.exports.getCart = async function(req, res, next){
  var user = req.signedCookies.userId;
  var cart
  if(!user){
    if(!req.signedCookies.cart){
      res.cookie('cart', {id: '', items: []}, {
        signed: true,
        maxAge: 10*24*3600*1000
      });
    }
  } else {
    var cart = await Cart.findOne({userId: req.signedCookies.userId});
    if(!cart){
      await Cart.create({
        userId: req.signedCookies.userId, items: []
      });
      cart = await Cart.findOne({userId: req.signedCookies.userId});
    }
    res.cookie('cart', cart, {
      signed: true
    });
  }
  next();
}