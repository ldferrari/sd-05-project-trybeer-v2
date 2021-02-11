const { Router } = require('express');

const service = require('../services/salesProductsService');

const details = Router();

const duzentosUm = 201;
const quinhentos = 500;

details.get('/', async (req, res) => {
  try {
    const { id } = req.query;
    const saleDetails = await service.getSaleDetails(id);
    res.status(duzentosUm).json(saleDetails);
  } catch (e) {
    res.status(quinhentos).json({ message: e.message });
    console.log(e);
  }
});

module.exports = details;
