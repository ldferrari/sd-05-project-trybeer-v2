const { Router } = require('express');

const service = require('../services/productsServices.js');

const products = Router();
const codeOk = 200;
const codeErr = 500;

products.get('/', async (_req, res) => {
  try {
    const allProducts = await service.getAllProducts();
    return res.status(codeOk).json(allProducts[0]);
  } catch (e) {
    res.status(codeErr).json({ message: e.message });
  }
});

products.get('/id', async (req, res) => {
  try {
    const product = await service.getById(req.query);
    return res.status(codeOk).json(product);
  } catch (e) {
    res.status(codeErr).json({ message: e.message });
  }
});

module.exports = products;
