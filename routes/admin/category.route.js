const express = require('express');
const router = express.Router();

var controller = require('../../controllers/admin/category.controller.js');

router.get('/', controller.getAllCategories);
router.get('/create', controller.getAddCategory);
router.post('/create', controller.postAddCategory);
router.get('/edit/:categoryId', controller.getEditCategory);
router.post('/edit/:categoryId', controller.postEditCategory);
router.delete('/delete/:categoryId', controller.deleteCategory);

module.exports = router;