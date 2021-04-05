const { Sale } = require('../models');

const getAllSales = async () => Sale.findAll();

const getSale = async (id) => {
  const saleExists = await Sale.findOne({ where: { id } });

  if (!saleExists) {
    return {
      error: true,
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return saleExists;
};

const update = async (id, status) => {
  const saleExists = await getSale(id);

  if (!saleExists) {
    return {
      error: true,
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  await Sale.update({ status }, { where: { id } });
  return ({ id, status, message: 'success' });
};

module.exports = {
  getAllSales,
  getSale,
  update,
};
