const express = require('express');
const router = express.Router();

var controller = require('../controllers/subscribe.controller');

router.post('/', controller.postSubscribe);

module.exports = router;