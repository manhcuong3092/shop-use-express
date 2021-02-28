const express = require('express');
const router = express.Router();

var multer  = require('multer')
var upload = multer({dest: './public/uploads/'});
var validate = require('../../validate/user.validate')
var controller = require('../../controllers/admin/user.controller.js');

router.get('/all-users', controller.getAllUsers);
router.get('/add-user', controller.getAddUser);
router.delete('/:userId', controller.deleteUser);
router.post('/add-user', 
  upload.single('avatar'), 
  validate.validateUser, 
  controller.postAddUser
);

module.exports = router;