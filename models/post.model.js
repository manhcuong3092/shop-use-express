var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
  title: {type: String, default: ""},
  content: {type: String, default: ""},
  slug: {type: String, default: ""},
  category: {type: Schema.Types.ObjectId, ref: 'Blogcategory', defaulut: null},
  avatar: {type: String, default: ""},
  createdDate: {type: String, default: ""},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User', defaulut: null},
  updatedDate: {type: String, default: ''},
  updatedBy: {type: Schema.Types.ObjectId, ref: 'User', defaulut: null},
  status: {type: Boolean, default: true}
});

var Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;