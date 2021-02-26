const express = require('express');
const router = express.Router();

var controller = require('../../controllers/admin/order.controller.js');

router.get('/all-orders', controller.getAllOrders);

module.exports = router;