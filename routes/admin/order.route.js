const express = require('express');
const router = express.Router();

var controller = require('../../controllers/admin/order.controller.js');

router.get('/', controller.getAllOrders);
router.delete('/:orderId', controller.deleteOrder);

module.exports = router;