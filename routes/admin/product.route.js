const express = require('express');
const router = express.Router();

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      cb(null, Date.now() + ext)
  }
});
const upload = multer({
  storage: storage
})

var validate = require('../../validate/product.validate')
var controller = require('../../controllers/admin/product.controller.js');

router.get('/all-products', controller.getAllProducts);
router.get('/add-product', controller.getAddProduct);

router.post('/add-product', 
  upload.fields([{name: 'avatar', maxCount: 1}, {name: 'images', maxCount: 10}]), 
  validate.validateProduct, 
  controller.postAddProduct
);

router.delete('/:productId', controller.deleteProduct);

module.exports = router;