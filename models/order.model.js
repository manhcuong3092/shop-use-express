var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  user: {type: Object, default: {id: ''}},
  items: [Object],
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