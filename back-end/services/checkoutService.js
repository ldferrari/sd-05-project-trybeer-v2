const { Sale } = require('../models');
const { SaleProduct } = require('../models');

const initialValue = 0;

const insertCheckout = async (body) => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber, cart } = body;
  const result = await Sale.create({
    userId,
    total_price: totalPrice,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
    status: 'Pendente',
  });
  cart.forEach((product) => {
    SaleProduct.create({
      saleId: result.dataValues.id,
      productId: product.id,
      quantity: product.quantity,
    });
  });
  if (!result) return { error: true, code: 'conflict', message: 'Algo deu errado' };
  return result;
};

module.exports = {
  insertCheckout,
};
