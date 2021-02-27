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
      if(contact.user.id){
        contact.user = await User.findById(contact.user.id);
      }
    }
    res.render('backend/contact/all-contacts', {
      contacts: contacts
    });
  }
}

module.exports.deleteContact = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_post.find(function(permission){
    return permission === 'delete';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var contactId = req.params.contactId;
    var contact = await Contact.findByIdAndRemove(contactId);
    if(contact){
      if(contact.user.id){
        contact.user = await User.findById(contact.user.id);
      }
      res.status(200).send(JSON.stringify(contact));
    } else {
      res.status(400).send('error');
    }
  }
}