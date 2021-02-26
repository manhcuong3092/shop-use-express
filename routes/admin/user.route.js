const express = require('express');
const router = express.Router();

var controller = require('../../controllers/admin/user.controller.js');

router.get('/all-users', controller.getAllUsers);
router.get('/add-user', controller.getAddUser);

module.exports = router;