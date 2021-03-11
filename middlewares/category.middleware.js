const Category = require('../models/category.model');

module.exports.getCategory = async function(req, res, next){
    var categories = await Category.find();
    res.locals.categories = categories;
    next();
}