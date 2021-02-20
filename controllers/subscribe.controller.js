var Subscriber = require('../models/subscriber.model');

module.exports.postSubscribe = async function(req, res){
  var email = req.body.email;
  var subscriber = {email: email};
  await Subscriber.create(subscriber);
  res.status(200).send(JSON.stringify({data: 'success'}));
}