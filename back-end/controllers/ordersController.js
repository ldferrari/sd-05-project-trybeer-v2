const { Router } = require('express');

const ordersService = require('../services/ordersService');
const orderDetailsService = require('../services/orderDetailsService');
const duzentos = 200;
const quinhentos = 500;

const successCode = 200;
const internalErrorCode = 500;

const orders = Router();
orders.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const getOrderDetails = await orderDetailsService.getOrderDetails(id);
    res.status(successCode).json(getOrderDetails);
  } catch (error) {
    console.log(error);
    res.status(internalErrorCode).json({ message: 'Algo deu errado.' });
  }
});

orders.post('/', async (req, res) => {
  try {
    const orders = await ordersService.getAllOrders(req.body.id);
    const result = orders.map((order) => order.dataValues);
    res.status(successCode).json(result);
  } catch (error) {
    console.error(error);
    res.status(internalErrorCode).json({ message: 'Algo deu errado.' });
  }
});

module.exports = orders;
