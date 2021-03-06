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

var controller = require('../../controllers/admin/post.controller.js');
var validate = require('../../validate/post.validate')

router.get('/', controller.getAllPosts);
router.get('/:userId', controller.getAllPosts);
router.get('/create', controller.getAddPost);

router.post('/create', 
  upload.single('avatar'), 
  validate.validatePost, 
  controller.postAddPost
);

router.get('/edit/:postId', controller.getEditPost);

router.post('/edit/:postId', 
  upload.single('avatar'),
  validate.validateEditPost, 
  controller.postEditPost
);

router.delete('/:postId', controller.deletePost);

module.exports = router;