const { users, sales } = require('../models');

async function createSale(newSale) {
  const { email, totalPrice, address, number, saleDate } = newSale;

  if (!email || !totalPrice || !address || !number || !saleDate) {
    throw new Error({ code: 404, message: 'Missing information' });
  }

  const user = await users.findOne({ where: { email } });
  const { id } = user.dataValues;

  const addNewSale = await sales.create({
    user_id: id,
    total_price: totalPrice,
    delivery_address: address,
    delivery_number: number,
    sale_date: saleDate,
  });

  return addNewSale;
}

async function getSalesById(body) {
  const { email } = body;

  if (!email) throw new Error({ code: 404, message: 'E-mail is invalid' });

  const user = await users.findOne({ where: { email } });
  const { id } = user.dataValues;

  const sale = await sales.findAll({ where: { user_id: id } });

  if (!sale) throw new Error({ code: 404, message: 'User has placed no orders yet' });

  return sale;
}

async function getAdminSales() {
  const allSales = await sales.findAll();
  return allSales;
}

async function updateSaleStatus(id, status) {
  await sales.update({ status }, { where: { id } });
  return { id, status, message: 'Status updated successfully!' };
}

module.exports = { createSale, getSalesById, getAdminSales, updateSaleStatus };
