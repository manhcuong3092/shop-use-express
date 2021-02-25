module.exports.index = function(req, res){
  res.render('frontend/about-us', {
    user: res.locals.user,
    cart: res.locals.cart
  });
}