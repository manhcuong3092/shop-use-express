const express = require('express');
const router = express.Router();

var controller = require('../controllers/cart.controller');

router.get('/', controller.getCart);

module.exports = router;