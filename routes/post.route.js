const express = require('express');
const router = express.Router();

var controller = require('../controllers/post.controller');

router.get('/', controller.getPost);

module.exports = router;