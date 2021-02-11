const { Router } = require('express');

const service = require('../services/salesService');

const sales = Router();

const duzentosUm = 201;
const quinhentos = 500;

sales.post('/', async (req, res) => {
  try {
    const result = await service.createSale(req.body);
    if (result.err) return res.status(result.err.code).json(result);
    res.status(duzentosUm).json({ message: 'Created' });
  } catch (e) {
    res.status(quinhentos).json({ message: e.message });
    console.log(e);
  }
});

sales.put('/preparing', async (req, res) => {
  try {
    const result = await service.changeStatusSale(req.body);
    if (result.err) return res.status(result.err.code).json(result);
    res.status(duzentosUm).json({ message: 'Preparando pedido' });
  } catch (e) {
    res.status(quinhentos).json({ message: e.message });
  }
});

sales.put('/close', async (req, res) => {
  try {
    const result = await service.closeSale(req.body);
    if (result.err) return res.status(result.err.code).json(result);
    res.status(duzentosUm).json({ message: 'Closed' });
  } catch (e) {
    res.status(quinhentos).json({ message: e.message });
  }
});

sales.get('/', async (req, res) => {
  try {
    const userSales = await service.getByUserId(req.query);
    if (userSales.err) return res.status(userSales.err.code).json(userSales);
    res.status(duzentosUm).json(userSales);
  } catch (e) {
    res.status(quinhentos).json({ message: e.message });
  }
});

sales.get('/sales-open', async (_req, res) => {
  try {
    const allSalesOpen = await service.getAllOpen();
    if (allSalesOpen.err) return res.status(allSalesOpen.err.code).json(allSalesOpen);
    res.status(duzentosUm).json(allSalesOpen);
  } catch (e) {
    res.status(quinhentos).json({ message: e.message });
  }
});

sales.get('/all-sales', async (_req, res) => {
  try {
    const allSales = await service.getAllSales();
    if (allSales.err) return res.status(allSales.err.code).json(allSales);
    res.status(duzentosUm).json(allSales);
  } catch (e) {
    res.status(quinhentos).json({ message: e.message });
  }
});

sales.get('/id', async (req, res) => {
  try {
    const { id } = req.query;
    const sale = await service.getSaleById(id);
    if (sale.err) return res.status(sale.err.code).json(sale);
    res.status(duzentosUm).json(sale);
  } catch (e) {
    res.status(quinhentos).json({ message: e.message });
  }
});

module.exports = sales;
