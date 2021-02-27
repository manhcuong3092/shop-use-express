const Order = require('../../models/order.model');
const User = require('../../models/user.model');
const Product = require('../../models/product.model');

module.exports.getAllOrders = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_order.find(function(permission){
    return permission === 'view';
  });
  if(!havePermission){
    res.render('backend/403');
    return;
  } else {
    var orders = await Order.find();
    for(let order of orders){
      if(order.user.id){
        order.user = await User.findById(order.user.id);
      } else {
        order.user = undefined;
      }
      for(let item of order.items){
        item.product = await Product.findById(item.product);
      }
    }
    
    res.render('backend/order/all-orders', {
      orders: orders
    });
  }
}

module.exports.deleteOrder = async function(req, res){
  var user = res.locals.user;
  var havePermission = user.permission.manage_order.find(function(permission){
    return permission === 'delete';
  });
  if(!havePermission){
    res.render('backend/403');
  } else {
    var orderId = req.params.orderId;
    var order = await Order.findByIdAndRemove(orderId);
    if(order){
      if(order.user.id){
        order.user = await User.findById(order.user.id);
      }
      res.status(200).send(JSON.stringify(order));
    } else {
      res.status(400).send('error');
    }
  }
}