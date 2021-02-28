const express = require('express');
const router = express.Router();

var multer  = require('multer')
var upload = multer({ 
  dest: './public/uploads/',
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

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