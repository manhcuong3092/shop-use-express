const express = require('express');
const router = express.Router();

var controller = require('../controllers/cart.controller');

router.get('/', controller.getCart);
router.get('/cart-data', controller.getCartData);
router.post('/change-cart', controller.changeCart);
router.delete('/delete-item/:productInfor', controller.deleteItem);

module.exports = router;