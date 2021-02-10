const { Sale } = require('../models');

const getDetails = async (saleId) => Sale.findOne({ where: { id: saleId } });

module.exports = {
  getDetails,
};
