var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: {type: String, default: ""},
  body: {type: String, default: ""},
  slug: {type: String, default: ""},
  category: {type: Object, default: {id: ''}},
  avatar: {type: String, default: ""},
  createdDate: {type: String, default: ""},
  createdBy: {type: String, default: ""},
  updatedDate: {type: String, default: ""},
  updatedBy: {type: String, default: ""},
  status: {type: Boolean, default: true}
});

var Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;