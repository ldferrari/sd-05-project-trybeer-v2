const { Router } = require('express');

const service = require('../services/productsServices.js');

const products = Router();

products.get('/', async (_req, res) => {
  try {
    const allProducts = await service.getAllProducts();
    if (allProducts.err) return res.status(allProducts.err.code).json(allProducts.err);
    return res.status(200).json(allProducts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

products.get('/id', async (req, res) => {
  try {
    const product = await service.getById(req.query);
    if (product.err) return res.status(product.err.code).json(product.err);
    return res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = products;
