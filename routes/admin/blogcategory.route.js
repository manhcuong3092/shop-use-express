const express = require('express');
const router = express.Router();

var controller = require('../../controllers/admin/blogcategory.controller.js');

router.get('/all-categories', controller.getAllCategories);
router.get('/add-category', controller.getAddCategory);

module.exports = router;