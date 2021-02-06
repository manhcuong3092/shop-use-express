const express = require('express');
const router = express.Router();

var controller = require('../controllers/auth.controller');

router.get('/', controller.login);

module.exports = router;