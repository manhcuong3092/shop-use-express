const express = require('express');
const router = express.Router();

var controller = require('../controllers/checkout.controller');

router.get('/', controller.checkout);
router.post('/', controller.postOrder);

module.exports = router;