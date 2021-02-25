module.exports.faq = function(req, res){
  res.render('frontend/faq', {
    user: res.locals.user,
    cart: res.locals.cart
  });
}