var Product = require('../models/product.model');
var Category = require('../models/category.model');

module.exports.index = async function(req, res){
  var products = await Product.find().populate('category');
  var queryParams = "";
  res.render('frontend/shop', {
    queryParams: queryParams,
    categories: res.locals.categories,
    products: products,
    user: res.locals.user,
    cart: res.locals.cart
  });
}

//get products by category
module.exports.category = async function(req, res){
  var queryParams = "";
  var categoryName = req.params.name;
  var products = await Product.find().populate('category');
  products = products.filter(function(product){
    return product.category.name === categoryName;
  });
  console.log(req.path);
  res.render('frontend/shop', {
    queryParams: queryParams,
    categories: res.locals.categories,
    products: products,
    user: res.locals.user,
    cart: res.locals.cart
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
  queryParams = "?";

  var products = await Product.find().populate('category');
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

  if(category){
    products = products.filter(function(product){
      return category === product.category.name;
    });
    queryParams = queryParams + '&category=' + category;
  }

  if(color){
    products = products.filter(function(product){
      return product.colors.includes(color.toLowerCase());
    });
    queryParams = queryParams + '&color=' + color;
  }

  if(size){
    products = products.filter(function(product){
      return product.sizes.includes(size.toLowerCase());
    });
    queryParams = queryParams + '&size=' + size;
  }

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

  console.log(req.path);
  res.render('frontend/shop', {
    categories: res.locals.categories,
    queryParams: queryParams,
    products: products,
    user: res.locals.user,
    cart: res.locals.cart
  });
}