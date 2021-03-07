var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  items: [
    {
      product: {type: Schema.Types.ObjectId, ref: 'Product', default: null}, 
      size: String, 
      color: String, 
      quantity: Number,
      _id: false,
    }
  ]
});

var Cart = mongoose.model('Cart', cartSchema, 'carts');

module.exports = Cart;