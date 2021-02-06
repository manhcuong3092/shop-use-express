const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');

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
var productRoute = require('./routes/product.route');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('frontend/index');
});

//use paths
app.use('/contact', contactRoute);
app.use('/faq', faqRoute);
app.use('/checkout', checkoutRoute);
app.use('/cart', cartRoute);
app.use('/login', authRoute);
app.use('/register', registerRoute);
app.use('/blog', blogRoute);
app.use('/post', postRoute);
app.use('/shop', shopRoute);
app.use('/product', productRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})