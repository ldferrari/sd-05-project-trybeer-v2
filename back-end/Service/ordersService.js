const { Sale } = require('../models');

const getOrders = async (userId) => Sale.findOne({ where: { userId } });

module.exports = {
  getOrders,
};
