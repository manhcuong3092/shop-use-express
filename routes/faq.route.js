const express = require('express');
const router = express.Router();

var controller = require('../controllers/faq.controller');

router.get('/', controller.faq);

module.exports = router;