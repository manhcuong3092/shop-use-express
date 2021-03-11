const Contact = require('../../models/contact.model');
const permission = require('../../permission/permission');

module.exports.getAllContacts = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_contact, 'view')){
    res.status(403).render('backend/403');
    return;
  }
  var contacts = await Contact.find().populate('user');
  res.render('backend/contact/all-contacts', {
    user: res.locals.user,
    contacts: contacts
  });
}

module.exports.deleteContact = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_contact, 'delete')){
    res.status(403).render('backend/403');
  } else {
    var contactId = req.params.contactId;
    var contact = await Contact.findByIdAndRemove(contactId).populate('user');
    if(contact){
      res.status(200).send(JSON.stringify(contact));
    } else {
      res.status(400).send('error');
    }
  }
}