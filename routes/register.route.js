const express = require('express');
const router = express.Router();
var validate = require('../validate/register.validate');

var controller = require('../controllers/register.controller');

router.get('/', controller.register);
router.post('/', validate.postRegister, controller.postRegister);

module.exports = router;