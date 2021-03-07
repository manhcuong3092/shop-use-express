var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: {type: String, default: ""},
    email: {type: String, default: ""},
    password: {type: String, default: ""},
    fullname: {type: String, default: ""},
    phoneNumber: {type: String, default: ""},
    address: {type: String, default: ""},
    avatar: {type: String, default: "/img/default-user-image.png"},
    role: {type: String, default: ""},
    accessAdminTool: {type: Boolean, defalut: false},
    permissions: {type: Object, default: {}},
    createdDate: {type: String, default: ""},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', defaulut: null},
    updatedDate: {type: String, default: ""},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'User', defaulut: null},
    validatedInfor: {type: Boolean, default: false},
    status: {type: Boolean, default: true}
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;