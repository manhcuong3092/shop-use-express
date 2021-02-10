var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });
var validate = require('../validate/userInfor.validate')

const express = require('express');
const router = express.Router();

var controller = require('../controllers/userInfor.controller');

router.get('/', controller.index);
router.post('/', upload.single('avatar'), validate.postRegister, controller.postInfor);

module.exports = router;