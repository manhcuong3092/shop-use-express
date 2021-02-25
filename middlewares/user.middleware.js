const User = require('../models/user.model');

module.exports.getUser = async function(req, res, next){
    var user = await User.findById(req.signedCookies.userId);
    var cart = req.signedCookies.cart;
    res.locals.user = user;
    res.locals.cart = cart;
    next();
}