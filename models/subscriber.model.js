var mongoose = require('mongoose');

var subscriberSchema = new mongoose.Schema({
  email: String,
});

var Subscriber = mongoose.model('Subscriber', subscriberSchema, 'subscribers');

module.exports = Subscriber;