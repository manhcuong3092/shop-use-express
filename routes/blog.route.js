const express = require('express');
const router = express.Router();

var controller = require('../controllers/blog.controller.js');

router.get('/', controller.index);
router.get('/post', controller.post);

module.exports = router;