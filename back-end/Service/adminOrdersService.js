const { User, Sales } = require('../models');

const getAdminOrders = async () => User.findAll();

const changeStatus = async (id) => {
  if (!id) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Informe um número de pedido válido.',
      statusCode: 401,
    };
  }
  return Sales.update({ where: { salesId: id } });
};

module.exports = {
  getAdminOrders,
  changeStatus,
};
