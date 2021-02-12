const { Router } = require('express');
const service = require('../services/productsService');
const validateJWT = require('../auth/validateJWT');
const httpStatusCode = require('../statusCode');

const products = Router();
const zero = 0;

products.get('/', validateJWT, async (req, res) => {
  const product = await service.getAll();
  // product.forEach((el) => el.qty = 0);
  for (let i = zero; i < product.length; i += 1) {
    product[i].dataValues.qty = 0;
  }
  // console.log seja lovado
  return res.status(httpStatusCode.ok).json(product);
});

module.exports = products;
