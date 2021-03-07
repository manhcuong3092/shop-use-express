var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var contactSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', default: null},
  customer: {name: String, email: String},
  content: String,
  createdDate: String,
  status: {type: Boolean, default: false},
});

var Contact = mongoose.model('Contact', contactSchema, 'contacts');

module.exports = Contact;