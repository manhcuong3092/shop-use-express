const express = require('express');
const router = express.Router();

var controller = require('../controllers/contact.controller');

router.get('/', controller.contact);

module.exports = router;