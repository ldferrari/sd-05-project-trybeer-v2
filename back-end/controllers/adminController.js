const { Router } = require('express');
const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const adminRouter = Router();
const status200 = 200;

adminRouter.get(
  '/',
  rescue(async (_req, res, next) => {
    const sales = await salesService.getAdminSales();
    if (sales.error) {
      next(sales);
    }
    res.status(status200).json(sales);
  }),
);

adminRouter.get(
  '/:id',
  rescue(async (req, res, next) => {
    const sale = await salesService.getSalesById(req.query);
    if (sale.error) {
      next(sale);
    }
    return res.status(status200).json(sale);
  }),
);

adminRouter.put(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const statusUpdate = await salesService.updateSaleStatus(id, status);
    
    return res.status(status200).json(statusUpdate);
  }),
);

module.exports = adminRouter;
