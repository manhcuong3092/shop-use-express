module.exports.index = function(req, res){
  res.render('frontend/about-us', {
    categories: res.locals.categories,
    user: res.locals.user,
    cart: res.locals.cart
  });
}