const { sale_product: salesProductsModel, product: m2 } = require('../models');
const { sale: model } = require('../models');
const userService = require('./usersService');
const moment = require('moment');
// const pending = 'Pendente';
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const zero = 0;

const insertSale = async (order, email) => {
  const { totalPrice, deliveryAddress, deliveryNumber, cart } = order;
  if (!totalPrice || !deliveryAddress || !deliveryNumber || !email || !cart) {
    return { error: true, statusCode: 400, message: 'Missing order information', };
  }
  const date = moment(Date.now()).format(dateFormat);
  const userID = await userService.getUserId(email);
  const { dataValues: { id: saleId } } = await model.create({user_id: userID, 
    delivery_address: deliveryAddress, delivery_number: deliveryNumber,
    sale_date: date, status: 'pending',total_price: Number(totalPrice)});
  const promisesArray = [];
  for (let i = zero; i < cart.length; i += 1) {
    promisesArray.push(
      salesProductsModel.create({ product_id: cart[i].id,
        quantity: cart[i].qty, sale_id: saleId })
    );
  }
  Promise.all(promisesArray);
  return { statusCode: 201, message: 'Order placed.' };
};

const getOrdersByUserId = async (email) => {
  if (!email) {
    return {
      error: true,
      statusCode: 400,
      message: 'Missing email.',
    };
  }
  const userId = await userService.getUserId(email);
  const orders = await model.findAll({ where: {user_id: userId}});

  if (!orders) {
    return {
      error: true,
      statusCode: 400,
      message: 'User not found',
    };
  }
  return orders;
};

const getSalesProducts = async (orderId) => {
  const orders = await model.findAll({
    where: {id: orderId}, include: [
      { model: salesProductsModel, include: [{ model: m2 }]}
    ]});
  return orders;
};

const getSalesAdmin = async () => {
  const sales = await model.findAll();
  return sales;
};

const updateOrderStatus = async (orderId, orderStatus) => {
  await model.update({ status: orderStatus }, {where: {id: orderId}});
};

module.exports = {
  insertSale,
  getOrdersByUserId,
  getSalesProducts,
  getSalesAdmin,
  updateOrderStatus,
};
