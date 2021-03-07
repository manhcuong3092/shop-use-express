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

router.get('/', controller.getAllUsers);
router.get('/create', controller.getAddUser);
router.delete('/delete/:userId', controller.deleteUser);
router.post('/create', 
  upload.single('avatar'), 
  validate.validateUser, 
  controller.postAddUser
);

router.get('/edit/:userEditId', controller.getEditUser);
router.post('/edit/:userId', 
  upload.single('avatar'), 
  validate.validateEditUser, 
  controller.postEditUser
);

module.exports = router;