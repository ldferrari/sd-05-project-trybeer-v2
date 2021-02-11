const { products } = require('../models');

const getAllProducts = async () => {
  const productList = await products.findAll();

  return productList;
};

module.exports = { getAllProducts };
