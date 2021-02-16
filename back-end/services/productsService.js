const { Product } = require('../models');

const getAllProducts = async () => {
  console.log('cheguei no getAll');
  const products = await Product.findAll();
  console.log(products, 'products');
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
