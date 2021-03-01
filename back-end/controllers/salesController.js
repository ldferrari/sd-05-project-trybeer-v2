const { Router } = require('express');
const rescue = require('express-rescue');
const { getOrderDetails } = require('../services/orderDetailsService');
const salesService = require('../services/salesService');

const sales = Router();

const successCode = 200;
const internalServerCode = 500;

sales.get('/', rescue(async (req, res, next) => {
  const sales = await salesService.getAllSales(req.body.id);
  if (sales.error) {
    next(sales);
  }
  res.status(successCode).json(sales);
}
));

sales.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const sale = await getOrderDetails(id);
  if (sale.error) {
    next(sale);
  }
  return res.status(successCode).json(sale);
}));

sales.put('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const response = await salesService.update(id, status);
  if (response.error) {
    next(response);
  }
  return res.status(successCode).json(response);
}));

module.exports = sales;
