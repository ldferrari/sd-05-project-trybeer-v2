const { Sale } = require('../models');

const getAllOrders = async (id) => Sale.findAll({
  where: { userId: id }});

module.exports = {
  getAllOrders,
};
