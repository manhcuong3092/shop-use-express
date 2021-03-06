require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

//routes decleare
var contactRoute = require('./routes/contact.route');
var faqRoute = require('./routes/faq.route');
var checkoutRoute = require('./routes/checkout.route');
var cartRoute = require('./routes/cart.route');
var authRoute = require('./routes/auth.route');
var registerRoute = require('./routes/register.route');
var blogRoute = require('./routes/blog.route');
var postRoute = require('./routes/post.route');
var shopRoute = require('./routes/shop.route');
var aboutUsRoute = require('./routes/aboutUs.route');
var productRoute = require('./routes/product.route');
var subscribeRoute = require('./routes/subscribe.route');
var userInforRoute = require('./routes/userInfor.route');
var adminRoute = require('./routes/admin/index.route');
var adminAuthRoute = require('./routes/admin/auth.route');
var adminProductRoute = require('./routes/admin/product.route');
var adminCategoryRoute = require('./routes/admin/category.route');
var adminBlogCategoryRoute = require('./routes/admin/blogcategory.route');
var adminOrderRoute = require('./routes/admin/order.route');
var adminUserRoute = require('./routes/admin/user.route');
var adminContactRoute = require('./routes/admin/contact.route');
var adminPostRoute = require('./routes/admin/post.route');

var authMiddleWare = require('./middlewares/auth.middleware');
var userInforMiddleware = require('./middlewares/userInfor.middeware');
var cartMiddleware = require('./middlewares/cart.middleware');
var userMiddleware = require('./middlewares/user.middleware');
var categoryMiddleware = require('./middlewares/category.middleware');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));

app.use(cartMiddleware.getCart);
app.use(userMiddleware.getUser);
app.use(categoryMiddleware.getCategory);

var User = require('./models/user.model');
var Cart = require('./models/cart.model');

app.get('/', userInforMiddleware.validateInfor, async function(req, res){
  user = await User.findById(req.signedCookies.userId);
  cart = req.signedCookies.cart;
  if(user){
    cart = await Cart.findById(req.signedCookies.cart.id).populate('product')
  }
  res.render('frontend/index',{
    user: user,
    cart: cart
  });
});

//use paths
app.use('/contact', contactRoute);
app.use('/faq', faqRoute);
app.use('/checkout', userInforMiddleware.validateInfor, checkoutRoute);
app.use('/cart',  cartRoute);
app.use('/login', authRoute);
app.use('/register', registerRoute);
app.use('/blog', blogRoute);
app.use('/post', postRoute);
app.use('/product', productRoute);
app.use('/shop', shopRoute);
app.use('/about-us', aboutUsRoute);
app.use('/subscribe', subscribeRoute);
app.use('/user-infor', authMiddleWare.requireAuth, userInforRoute);
//admin path
app.use('/admin', authMiddleWare.adminRequireAuth, adminRoute);
app.use('/login/admin', adminAuthRoute);
app.use('/admin/products', authMiddleWare.adminRequireAuth, adminProductRoute);
app.use('/admin/categories', authMiddleWare.adminRequireAuth, adminCategoryRoute);
app.use('/admin/blogcategories', authMiddleWare.adminRequireAuth, adminBlogCategoryRoute);
app.use('/admin/orders', authMiddleWare.adminRequireAuth, adminOrderRoute);
app.use('/admin/users', authMiddleWare.adminRequireAuth, adminUserRoute);
app.use('/admin/contacts', authMiddleWare.adminRequireAuth, adminContactRoute);
app.use('/admin/posts', authMiddleWare.adminRequireAuth, adminPostRoute);

app.use(function (req, res, next) {
  res.status(404).render('backend/404');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})