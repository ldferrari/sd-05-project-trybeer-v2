const orderService = require('./ordersService');
const { sale } = require('../../models');

const ordersFactory = () => {
  return {
  insertSale: orderService.insertSale(sale),
  getOrdersByUserId: orderService.getOrdersByUserId(sale),
  getSalesProducts: orderService.getSalesProducts(sale),
}};

module.exports = ordersFactory;
