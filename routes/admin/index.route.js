const express = require('express');
const router = express.Router();

var productRoute = require('./product.route');

var authMiddleWare = require('../../middlewares/auth.middleware')

router.get('/', authMiddleWare.requireAuth, function(req, res){
  res.render('backend/index')
});

module.exports = router;