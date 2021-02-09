const { Router } = require('express');
const rescue = require('express-rescue');
const authToken = require('../middlewares/authToken');

const salesService = require('../services/salesService');

const salesRouter = Router();
const status400 = 400;
const status200 = 200;
const status401 = 401;

salesRouter.post(
  '/',
  rescue(async (req, res) => {
    const { body } = req;

    const newSale = await salesService.createSale(body);
    return newSale
      ? res.status(status200).json({ message: 'Order placed succesfully!' })
      : res.status(status400).json({ message: 'Order was misplaced!' });
  }),
);

salesRouter.get(
  '/',
  rescue(async (req, res) => {
    const userSales = await salesService.getSalesById(req.query);

    return userSales
      ? res.status(status200).json(userSales)
      : res.status(status400).json({ message: 'No orders found!' });
  }),
);

salesRouter.get(
  '/:id',
  rescue(async (req, res) => {
    const salesById = await salesService.getSalesById(req.query);

    return salesById
      ? res.status(status200).json(salesById)
      : res.status(status400).json({ message: 'No orders found!' });
  }),
);

salesRouter.get(
  '/admin',
  authToken,
  rescue(async (_req, res) => {
    const sales = salesService.getAdminSales();

    return sales
      ? res.status(status200).json(sales)
      : res.status(status401).json({ message: 'Unauthorized access' });
  }),
);

module.exports = salesRouter;
