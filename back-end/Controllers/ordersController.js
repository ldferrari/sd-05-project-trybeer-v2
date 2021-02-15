const { Router } = require('express');

const service = require('../Service/ordersService');

const orders = Router();

orders.get('/', async (req, res) => {
  try {
    const { id } = req.payload;
    // console.log('id order controler ==>', id);
    const ordersProducts = await service.getOrders(id);
    res.status(200).json(ordersProducts);
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Algo deu errado.' });
    res.status(500).json({ message: error });
  }
});

module.exports = orders;
