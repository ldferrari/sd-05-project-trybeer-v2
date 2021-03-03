const { Router } = require('express');

const service = require('../services/sales.services');
const requests = require('../services/salesRequests');

const TWOHUNDRED = 200;
const TWOHUNDREDANDONE = 201;

module.exports = ({ mysqlConnection }) => {
  const {
    addSale,
    getAllSales,
    updateStatus,
    getSaleByUserId,
    detailByOrderId,
  } = service(requests({ mysqlConnection }));
  const sales = Router();

  sales.get('/', getAllSales, (req, res) => {
    // todas as vendas
    res.status(TWOHUNDRED).json(req.data);
  });

  sales.get('/user/:id', getSaleByUserId, (req, res) => {
    // vendas especificas de um usuário
    res.status(TWOHUNDRED).json(req.data);
  });

  sales.post('/', addSale, (req, res) => {
    // adicionar um pedido
    res.status(TWOHUNDREDANDONE).json(req.data);
  });

  sales.get('/:id', detailByOrderId, (req, res) => {
    // obtendo os detalhes de uma venda
    res.status(TWOHUNDRED).json(req.data);
  });

  sales.put('/status', updateStatus, (req, res) => {
    // update no status do pedido
    res.status(TWOHUNDRED).json(req.data);
  });
  return sales;
};
