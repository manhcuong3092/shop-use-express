const { signedCookie } = require('cookie-parser');
const Cart = require('../models/cart.model');
const mongoose = require('mongoose');

//function to get cart of user or customer
module.exports.getCart = async function(req, res, next){
  var user = req.signedCookies.userId;
  var cart
  if(!user){
    if(!req.signedCookies.cart){
      res.cookie('cart', {user: null, items: []}, {
        signed: true,
        maxAge: 10*24*3600*1000
      });
    }
  } else {
    var cart = await Cart.findOne({user: req.signedCookies.userId});
    if(!cart){
      cart = await Cart.create({
        user: mongoose.Types.ObjectId(req.signedCookies.userId) , items: []
      });
    }
    res.cookie('cart', cart, {
      signed: true
    });
  }
  cart = req.signedCookies.cart;
  next();
}
