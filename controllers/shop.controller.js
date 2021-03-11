var Product = require('../models/product.model');
var Category = require('../models/category.model');

//get shop
module.exports.index = async function(req, res){
  var query = req.query;
  var products = await Product.find().populate('category');
  var queryParams = "";

  var page = parseInt(query.page) || 1;
  var perPage = 3;
  var start = (page - 1) * perPage;   //pagination
  var end = page * perPage;

  //pagination
  var maxPage = Math.ceil(products.length/perPage);
  products = products.slice(start, end);

  res.render('frontend/shop', {
    queryParams: queryParams,
    categories: res.locals.categories,
    products: products,
    user: res.locals.user,
    cart: res.locals.cart,
    pageNum: page,
    maxPage: maxPage
  });
}

//get products by category
module.exports.category = async function(req, res){
  var query = req.query;
  var queryParams = "";
  var categoryName = req.params.name;

  var page = parseInt(query.page) || 1;
  var perPage = 3;
  var start = (page - 1) * perPage;   //pagination
  var end = page * perPage;

  var products = await Product.find().populate('category');
  products = products.filter(function(product){
    return product.category.name === categoryName;
  });

  //pagination
  var maxPage = Math.ceil(products.length/perPage);
  products = products.slice(start, end);
  
  res.render('frontend/shop', {
    queryParams: queryParams,
    categories: res.locals.categories,
    products: products,
    user: res.locals.user,
    cart: res.locals.cart,
    pageNum: page,
    maxPage: maxPage,
    categoryName: categoryName
  });
}

//Search product by query
module.exports.search = async function(req, res){
  var query = req.query;
  var q = query.q;
  var category = query.category;
  var color = query.color;
  var size = query.size;
  var min = query.min;
  var max = query.max;
  var queryParams = "?";

  var page = parseInt(query.page) || 1;
  var perPage = 3;
  var start = (page - 1) * perPage;   //pagination
  var end = page * perPage;

  var products = await Product.find().populate('category');

  //filter by search text
  if(q){
    q = q.toLowerCase();
    products = products.filter(function(product){
      return (product.category.name.toLowerCase().includes(q) || product.name.toLowerCase().includes(q) || 
                product.shortDescription.toLowerCase().includes(q) ||
                product.tags.includes(q) ||
                product.seo.toLowerCase().includes(q));
    });
    queryParams = queryParams + 'q=' + q;
  }

  //filter by category
  if(category){
    products = products.filter(function(product){
      return category === product.category.name;
    });
    queryParams = queryParams + '&category=' + category;
  }

  //filter by color
  if(color){
    products = products.filter(function(product){
      return product.colors.includes(color.toLowerCase());
    });
    queryParams = queryParams + '&color=' + color;
  }

  //filter by size
  if(size){
    products = products.filter(function(product){
      return product.sizes.includes(size.toLowerCase());
    });
    queryParams = queryParams + '&size=' + size;
  }

  //filter by min max price
  if(min && max){
    min = parseInt(min);
    max = parseInt(max);
    products = products.filter(function(product){
      if(product.salePrice){
        product.salePrice >= min && product.salePrice <= max;
      }
      return product.price >= min && product.price <= max;
    });
    queryParams = queryParams + '&min=' + min + '&max=' + max;
  }

  //pagination
  var maxPage = Math.ceil(products.length/perPage);
  products = products.slice(start, end);

  console.log(req.path);
  res.render('frontend/shop', {
    categories: res.locals.categories,
    queryParams: queryParams,
    products: products,
    user: res.locals.user,
    cart: res.locals.cart,
    pageNum: page,
    maxPage: maxPage
  });
}