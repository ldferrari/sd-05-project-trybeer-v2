const { Sale } = require('../models');

const getAdminOrders = async () => Sale.findAll();

const changeStatus = async (id) => {
  if (!id) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Informe um número de pedido válido.',
      statusCode: 401,
    };
  }
  return Sale.update({ where: { id } });
};

module.exports = {
  getAdminOrders,
  changeStatus,
};
