var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: {type: String, default: ""},
  content: {type: String, default: ""},
  slug: {type: String, default: ""},
  category: {type: Object, default: {id: ''}},
  avatar: {type: String, default: ""},
  createdDate: {type: String, default: ""},
  createdBy: {type: Object, default: {id: ''}},
  updatedDate: {type: String, default: ''},
  updatedBy: {type: Object, default: {id: ''}},
  status: {type: Boolean, default: true}
});

var Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;