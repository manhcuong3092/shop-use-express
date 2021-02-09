var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
  user: {type: String, default: ""},
  customer: {name: String, email: String},
  content: String,
  createdDate: String,
  status: {type: Boolean, default: false},
});

var Contact = mongoose.model('Contact', contactSchema, 'contacts');

module.exports = Contact;