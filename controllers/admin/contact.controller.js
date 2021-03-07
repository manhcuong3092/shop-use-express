const Contact = require('../../models/contact.model');

module.exports.getAllContacts = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_contact.find(function(permission){
    return permission === 'view';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  }
  var contacts = await Contact.find().populate('user');
  res.render('backend/contact/all-contacts', {
    contacts: contacts
  });
}

module.exports.deleteContact = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_post.find(function(permission){
    return permission === 'delete';
  });
  if(!havePermission){
    res.render('backend/403');
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