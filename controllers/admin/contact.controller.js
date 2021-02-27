const Contact = require('../../models/contact.model');
const User = require('../../models/user.model');

module.exports.getAllContacts = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_contact.find(function(permission){
    return permission === 'view';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var contacts = await Contact.find();
    for(let contact of contacts){
      if(contact.user){
        contact.user = await User.findById(contact.user.id);
      }
    }
    res.render('backend/contact/all-contacts', {
      contacts: contacts
    });
  }
}