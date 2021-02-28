const express = require('express');
const router = express.Router();

var multer  = require('multer')
var upload = multer({dest: './public/uploads/'});

var controller = require('../../controllers/admin/post.controller.js');
var validate = require('../../validate/post.validate')

router.get('/all-posts', controller.getAllPosts);
router.get('/add-post', controller.getAddPost);

router.post('/add-post', 
  upload.single('avatar'), 
  validate.validatePost, 
  controller.postAddPost
);

router.delete('/:postId', controller.deletePost);

module.exports = router;