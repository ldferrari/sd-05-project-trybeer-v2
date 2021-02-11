const { products } = require('../models');

const getAllProducts = async () => {
  const allProducts = await products.findAll();
  const err = { err: { code: 404, message: 'Not found' } };

  if (!allProducts) return err;

  return allProducts;
};

const getById = async (body) => {
  const { id } = body;
  const err = { err: { code: 404, message: 'Id not found' } };

  if (!id) return err;

  const product = await products.findOne({ where: { id } });

  if (!product) return err;

  return product;
};

module.exports = {
  getAllProducts,
  getById,
};
