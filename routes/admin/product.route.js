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

router.get('/', controller.getAllProducts);
router.get('/create', controller.getAddProduct);

router.post('/create', 
  upload.fields([{name: 'avatar', maxCount: 1}, {name: 'images', maxCount: 10}]), 
  validate.validateAddProduct, 
  controller.postAddProduct
);

router.get('/edit/:productId', controller.getEditProduct);

router.post('/edit/:productId', 
  upload.fields([{name: 'avatar', maxCount: 1}, {name: 'images', maxCount: 10}]), 
  validate.validateEditProduct, 
  controller.postEditProduct
);

router.delete('/delete/:productId', controller.deleteProduct);
router.delete('/delete-image/:productId&:imageId', controller.deleteImageProduct);
module.exports = router;