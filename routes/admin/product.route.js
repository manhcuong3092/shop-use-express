const express = require('express');
const router = express.Router();

var controller = require('../../controllers/admin/product.controller.js');

router.get('/all-products', controller.getAllProducts);
router.get('/add-product', controller.getAddProduct);

module.exports = router;