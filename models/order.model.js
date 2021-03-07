var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', default: null},
  items: [
    {
      product: {type: Schema.Types.ObjectId, ref: 'Product', default: null}, 
      size: String, 
      color: String, 
      quantity: Number,
      _id: false,
    }
  ],
  customer: {
    fullname: String,
    address: String,
    email: String,
    phoneNumber: String
  },
  totalPrice: Number,
  createdDate: String,
  status: {type: String, default: 'pending'}
});

var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;