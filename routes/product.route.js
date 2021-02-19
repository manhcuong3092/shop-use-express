const express = require('express');
const router = express.Router();

var controller = require('../controllers/product.controller');

router.get('/:productId', controller.detail);
router.post('/:productId', controller.addToCart);

module.exports = router;