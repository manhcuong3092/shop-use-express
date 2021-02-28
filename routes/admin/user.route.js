const express = require('express');
const router = express.Router();

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      cb(null, Date.now() + ext)
  }
});
const upload = multer({
  storage: storage
})
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