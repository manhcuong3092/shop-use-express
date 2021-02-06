const express = require('express');
const router = express.Router();

var controller = require('../controllers/register.controller');

router.get('/', controller.register);

module.exports = router;