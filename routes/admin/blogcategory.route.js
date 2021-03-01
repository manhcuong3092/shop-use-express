const express = require('express');
const router = express.Router();

var controller = require('../../controllers/admin/blogcategory.controller.js');

router.get('/', controller.getAllCategories);
router.get('/create', controller.getAddCategory);
router.post('/create', controller.postAddCategory);
router.get('/edit/:categoryId', controller.getEditBlogCategory);
router.post('/edit/:categoryId', controller.postEditBlogCategory);
router.delete('/delete/:blogCategoryId', controller.deleteBlogCategory);

module.exports = router;