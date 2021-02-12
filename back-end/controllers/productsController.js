const { Router } = require('express');

const service = require('../services/productsServices.js');

const products = Router();
const codeOk = 200;
const codeErr = 500;

const duzentos = 200;
const quinhentos = 500;

products.get('/', async (_req, res) => {
  try {
    const allProducts = await service.getAllProducts();
    if (allProducts.err) return res.status(allProducts.err.code).json(allProducts.err);
    return res.status(duzentos).json(allProducts);
  } catch (e) {
    res.status(quinhentos).json({ message: e.message });
  }
});

products.get('/id', async (req, res) => {
  try {
    const product = await service.getById(req.query);
    if (product.err) return res.status(product.err.code).json(product.err);
    return res.status(duzentos).json(product);
  } catch (e) {
    res.status(quinhentos).json({ message: e.message });
  }
});

module.exports = products;
