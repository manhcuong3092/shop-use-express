module.exports.faq = function(req, res){
  res.render('frontend/faq', {
    categories: res.locals.categories,
    user: res.locals.user,
    cart: res.locals.cart
  });
}