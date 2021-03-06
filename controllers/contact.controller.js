const date = require('date-and-time');

var Contact = require('../models/contact.model');

//render contact page
module.exports.contact = function(req, res){
  res.render('frontend/contact', {
    categories: res.locals.categories,
    user: res.locals.user,
    cart: res.locals.cart
  });
}

//get data contact form ajax, store to db
module.exports.postContact = function(req, res){
  var now = new Date();
  var createdDate = date.format(now, 'DD MMM YYYY');
  var name = req.body.name;
  var email = req.body.email;
  var content = req.body.content
  
  var contact = {
    customer: {name: name, email: email},
    content: content,
    createdDate: createdDate,
  };
  if(req.signedCookies.userId){
    contact.user = {id: req.signedCookies.userId}
  }
  Contact.create(contact);
  res.status(200).send(JSON.stringify(req.body));
}