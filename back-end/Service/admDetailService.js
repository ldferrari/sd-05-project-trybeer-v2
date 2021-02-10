const { Sale_Product } = require('../models');

const getDetails = async (saleId) => Sale_Product.findOne({ where: { sale_id: saleId } });

module.exports = {
  getDetails,
};
