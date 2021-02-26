const express = require('express');
const router = express.Router();

var controller = require('../../controllers/admin/auth.controller');

router.get('/', controller.login);
router.post('/', controller.postLogin);

module.exports = router;