const express = require('express');
const router = express.Router();

var controller = require('../controllers/blog.controller.js');

router.get('/', controller.index);

module.exports = router;