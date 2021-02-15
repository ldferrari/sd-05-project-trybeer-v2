const { Sale } = require('../models');

const getOrders = async (userId) => Sale.findAll({ where: { userId } });

module.exports = {
  getOrders,
};
