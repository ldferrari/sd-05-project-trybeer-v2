const { product: model } = require('../models');

const getAll = async () => {
  const products = await model.findAll();
  return products;
};
// const getProductById = async (productId) => {
//   if (!productId) {
//     return {
//       error: true,
//       statusCode: 400,
//       message: 'Product not found.',
//     };
//   }
//   const product = await model.getProductById(productId);

// };
module.exports = {
  getAll,
};
