var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  userId: String,
  items: [Object],
  customer: {
    fullname: String,
    address: String,
    email: String,
    phoneNumber: String
  },
  totalPrice: Number,
  createdDate: String,
  status: {type: String, default: 'Pending'}
});

var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;