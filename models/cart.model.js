var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
  userId: String,
  items: [Object]
});

var Cart = mongoose.model('Cart', cartSchema, 'carts');

module.exports = Cart;