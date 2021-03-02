const { Router } = require('express');

const service = require('../services/products.services');
const requests = require('../services/productsRequests');

const TWOHUNDRED = 200;


module.exports = ({ mysqlConnection }) => {
  const { getAllProducts, getProductById, addProduct } = service(
    requests({ mysqlConnection }),
  );

  const products = Router();

  products.get('/', getAllProducts, (req, res) => {
    res.status(TWOHUNDRED).json(req.data);
  });

  products.get('/:id', getProductById, (req, res) => {
    res.status(TWOHUNDRED).json(req.data);
  });

  products.post('/', addProduct, (req, res) => {
    res.status(TWOHUNDRED).json(req.data);
  });

  return products;
};
