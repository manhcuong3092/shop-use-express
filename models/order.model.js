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
  createdDate: String,
  status: {type: Boolean, default: false}
});

var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;