const Order = require('../../models/order.model');
const permission = require('../../permission/permission');

module.exports.getAllOrders = async function(req, res){
  var user = res.locals.user;
  if(!permission.checkPermission(user.permissions.manage_order, 'view')){
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
  if(!permission.checkPermission(user.permissions.manage_order, 'delete')){
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