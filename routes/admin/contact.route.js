const express = require('express');
const router = express.Router();

var controller = require('../../controllers/admin/contact.controller.js');

router.get('/', controller.getAllContacts);
router.delete('/:contactId', controller.deleteContact);

module.exports = router;