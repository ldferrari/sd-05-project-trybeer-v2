const { Product } = require('../models');

const getAllProducts = async () => {
  const products = await Product.findAll();
  if (!products) {
    return {
      error: true,
      code: 'not_found',
      message: 'Data not found'
    };
  }
  return products;
};

module.exports = {
  getAllProducts,
};
