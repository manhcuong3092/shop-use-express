const User = require('../models/user.model');

module.exports.requireAuth = async function(req, res, next){
    console.log(req.cookies, req.signedCookies);
    console.log(req.signedCookies.userId);
    if(!req.signedCookies.userId){
        res.redirect('/login');
        return;
    }

    User.findById(req.signedCookies.userId)

    var user = await User.findById(req.signedCookies.userId);
    console.log(user);
    if(!user){  
        res.redirect('/login');
        return;
    }
    // res.locals.user = user;
    next();
}