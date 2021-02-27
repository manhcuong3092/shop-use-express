const express = require('express');
const router = express.Router();

var controller = require('../../controllers/admin/blogcategory.controller.js');

router.get('/all-blogcategories', controller.getAllCategories);
router.get('/add-blogcategory', controller.getAddCategory);

module.exports = router;