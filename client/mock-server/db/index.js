var categories = require('./categories.json');
var products = require('./products.json');

// and so on

module.exports = function() {
  return {
    products: products,
    categories: categories
  };
};
