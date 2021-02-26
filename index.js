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

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));

app.use(cartMiddleware.getCart);
app.use(userMiddleware.getUser);

var User = require('./models/user.model');

app.get('/', userInforMiddleware.validateInfor, async function(req, res){
  user = await User.findById(req.signedCookies.userId);
  cart = req.signedCookies.cart;
  res.render('frontend/index',{
    user: user,
    cart: cart
  });
});

//use paths
app.use('/contact', contactRoute);
app.use('/faq', faqRoute);
app.use('/checkout', checkoutRoute);
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
app.use('/admin/product', authMiddleWare.adminRequireAuth, adminProductRoute);
app.use('/admin/category', authMiddleWare.adminRequireAuth, adminCategoryRoute);
app.use('/admin/blogcategory', authMiddleWare.adminRequireAuth, adminBlogCategoryRoute);
app.use('/admin/order', authMiddleWare.adminRequireAuth, adminOrderRoute);
app.use('/admin/user', authMiddleWare.adminRequireAuth, adminUserRoute);
app.use('/admin/contact', authMiddleWare.adminRequireAuth, adminContactRoute);
app.use('/admin/post', authMiddleWare.adminRequireAuth, adminPostRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})