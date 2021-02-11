const { sales_products } = require('../models');

const getSaleDetails = async (id) => {
  if (!id) return { err: { code: 401, message: 'id not found' } };
  const saleDetails = await sales_products.findAll({ where: { sale_id: id } });
  return saleDetails;
};

module.exports = {
  getSaleDetails,
};
