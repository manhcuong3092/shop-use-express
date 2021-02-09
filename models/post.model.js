var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  body: String,
  slug: String,
  categoryId: String,
  avatar: String,
  createdDate: String,
  createdBy: String,
  updatedDate: {type: String, default: ""},
  updatedBy: {type: String, default: ""},
  status: {type: Boolean, default: true}
});

var Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;