var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, default: ""},
    email: {type: String, default: ""},
    password: {type: String, default: ""},
    fullname: {type: String, default: ""},
    phoneNumber: {type: String, default: ""},
    address: {type: String, default: ""},
    avatar: {type: String, default: "img/default-user-image.png"},
    roles: [{type: String, default: ""}],
    createdDate: {type: String, default: ""},
    createdBy: {type: String, default: ""},
    updatedDate: {type: String, default: ""},
    updatedBy: {type: String, default: ""},
    validatedInfor: {type: Boolean, default: false},
    status: {type: Boolean, default: true}
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;