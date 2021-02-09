const { Router } = require('express');
const rescue = require('express-rescue');
const productService = require('../services/productService');
const authToken = require('../middlewares/authToken');

const productRouter = Router();
const status400 = 400;
const status200 = 200;

productRouter.get(
  '/',
  authToken,
  rescue(async (_req, res) => {
    const products = await productService.getAllProducts();
    return products
      ? res.status(status200).json(products)
      : res.status(status400).json({
        message: 'Not found!',
      });
  }),
);

module.exports = productRouter;
