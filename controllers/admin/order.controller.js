const Order = require('../../models/order.model');

module.exports.getAllOrders = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_order.find(function(permission){
    return permission === 'view';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } else {
    var orders = await Order.find()
      .populate('user')
      .populate('items.product')
    res.render('backend/order/all-orders', {
      orders: orders
    });
  }
}

module.exports.deleteOrder = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permissions.manage_order.find(function(permission){
    return permission === 'delete';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var orderId = req.params.orderId;
    var order = await Order.findByIdAndRemove(orderId).populate('user');
    if(order){
      res.status(200).send(JSON.stringify(order));
    } else {
      res.status(400).send('error');
    }
  }
}