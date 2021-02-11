const { sales_products } = require('../models');

const getSaleDetails = async (id) => {
  const err = { err: { code: 401, message: 'error' } };
  if (!id) {
    throw err;
  }

  const saleDetails = await sales_products.findOne({ where: { id } });

  if (!saleDetails) {
    throw err;
  }

  return saleDetails;
};

module.exports = {
  getSaleDetails,
};
