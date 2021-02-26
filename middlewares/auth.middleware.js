const User = require('../models/user.model');

module.exports.requireAuth = async function (req, res, next) {
  // console.log(req.cookies, req.signedCookies);
  // console.log(req.signedCookies.userId);
  if (!req.signedCookies.userId) {
    res.redirect('/login');
    return;
  }
  var user = await User.findById(req.signedCookies.userId);
  if (!user) {
    res.redirect('/login');
    return;
  }
  // res.locals.user = user;
  next();
}

module.exports.adminRequireAuth = async function (req, res, next) {
  // console.log(req.cookies, req.signedCookies);
  // console.log(req.signedCookies.userId);
  if (!req.signedCookies.userId) {
    res.redirect('/login/admin');
    return;
  }
  var user = await User.findById(req.signedCookies.userId);
  if (!user) {
    res.redirect('/login/admin');
    return;
  }
  if (!user.accessAdminTool) {
    res.render('backend/403');
    return;
  }
  // res.locals.user = user;
  next();
}