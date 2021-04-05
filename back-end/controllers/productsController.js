const { Router } = require('express');
const rescue = require('express-rescue');

const productsService = require('../services/productsService');

const products = Router();

const successCode = 200;

products.get('/', rescue(async (req, res, next) => {
  const products = await productsService.getAllProducts();
  if (products.error) {
    return next(products);
  }
  res.status(successCode).json(products);
}
));

module.exports = products;
