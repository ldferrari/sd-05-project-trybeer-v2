const { Router } = require('express');
const rescue = require('express-rescue');
const checkoutService = require('../services/checkoutService');

const checkout = Router();
const createdCode = 201;

checkout.post('/', rescue (async (req, res, next) => {
  const insertCheckout = await checkoutService.insertCheckout(req.body);
  if (insertCheckout.error) {
    next(insertCheckout);
  }
  res.status(createdCode).json({ message: 'ok' });
}));

module.exports = checkout;
