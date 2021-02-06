const express = require('express');
const router = express.Router();

var controller = require('../controllers/checkout.controller');

router.get('/', controller.checkout);

module.exports = router;