const express = require('express');
const router = express.Router();

var controller = require('../../controllers/admin/post.controller.js');

router.get('/all-posts', controller.getAllPosts);
router.get('/add-post', controller.getAddPost);
router.delete('/:postId', controller.deletePost);

module.exports = router;