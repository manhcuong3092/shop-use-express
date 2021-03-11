const express = require('express');
const router = express.Router();

var controller = require('../controllers/shop.controller');

router.get('/', controller.index);

router.get('/category/:name', controller.category);

router.get('/search', controller.search);
module.exports = router;