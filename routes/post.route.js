const express = require('express');
const router = express.Router();

var controller = require('../controllers/post.controller');

router.get('/:postId', controller.getPost);

module.exports = router;