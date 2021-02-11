const { sales, users, sales_products } = require('../models');

const checkTotalPrice = (totalPrice) => {
  if (totalPrice > 0) {
    return totalPrice;
  }
  const err = { err: { code: 404, message: 'total price is invalid' } };
  return err;
};

const checkAddress = (address) => {
  if (typeof address !== 'string' || !address.length) {
    const err = { err: { code: 404, message: 'address is invalid' } };
    return err;
  }
  return address;
};

const checkAddressNumber = (addressNumber) => {
  if (!addressNumber) {
    const err = { err: { code: 404, message: 'address number is invalid' } };
    return err;
  }
  return addressNumber;
};

const checkEmail = (email) => {
  if (!email) {
    const err = { err: { code: 404, message: 'email is invalid' } };
    return err;
  }
  return email;
};

const checkSaleDate = (saleDate) => {
  if (!saleDate) {
    const err = { err: { code: 404, message: 'date is invalid' } };
    return err;
  }
  const dateArray = saleDate.split('/');
  return new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
};

const checkLogin = async (email) => {
  const userFound = await users.findOne({ where: { email } });
  if (!userFound) {
    const err = { err: { code: 404, message: 'user not found' } };
    return err;
  }
  const { id } = userFound;
  return id;
};

const checkAll = async (email, totalPrice, address, addressNumber) => {
  email = checkEmail(email);
  if (email.err) return email;
  const total_price = checkTotalPrice(totalPrice);
  if (total_price.err) return total_price;
  const delivery_address = checkAddress(address);
  if (delivery_address.err) return delivery_address;
  const delivery_number = checkAddressNumber(addressNumber);
  if (delivery_number.err) return delivery_number;
  return { email, total_price, delivery_address, delivery_number };
};

const getDados = async (email, totalPrice, address, addressNumber, saleDate) => {
  const dados = await checkAll(email, totalPrice, address, addressNumber);
  if (dados.err) return dados;
  const sales_date = checkSaleDate(saleDate);
  if (sales_date.err) return sales_date;
  const user_id = await checkLogin(email);
  if (user_id.err) return user_id;
  return { user_id, sales_date, ...dados };
};

const createSalesProducts = async (products, sale_id) => {
  products.forEach(async (product) => {
    const product_id = product.id;
    const quantity = product.quantity;
    await sales_products.create({ sale_id, product_id, quantity });
  });
};

const createSale = async ({ email, totalPrice, address, addressNumber, saleDate, products }) => {
  const dados = await getDados(email, totalPrice, address, addressNumber, saleDate);
  if (dados.err) return dados;
  const { user_id, sales_date, total_price, delivery_address, delivery_number } = dados;
  const createdSale = await sales.create({ user_id, total_price, delivery_address, delivery_number, sales_date, status: 'Pendente' });
  // checkCreatedSale(createdSale);
  const sale_id = createdSale.dataValues.id;
  await createSalesProducts(products, sale_id);
  return createdSale;
};

const closeSale = async (body) => {
  const { id } = body;
  if (!id) return { err: { code: 404, message: 'sale id is invalid' } };
  const result = await sales.update({ status: 'Entregue' }, { where: { id } } );
  if (result[0] === 0) return { err: { code: 404, message: 'sale id is invalid' } };
  return result;
};

const changeStatusSale = async (body) => {
  const { id } = body;
  if (!id) return { err: { code: 404, message: 'sale id is invalid' } };
  const result = await sales.update({ status: 'Preparando' }, { where: { id } } );
  if (result[0] === 0) return { err: { code: 404, message: 'sale id is invalid' } };
  return result;
};

const getByUserId = async (body) => {
  const { email } = body;
  if (!email) return { err: { code: 404, message: 'email is invalid' } };
  const id = await checkLogin(email);
  if (id.err) return id;
  const userSales = await sales.findAll({ where: { user_id: id } });
  return userSales;
};

const getAllOpen = async () => {
  const allSalesOpen = await sales.findAll({ where: { status: 'Pendente' } });
  if (!allSalesOpen) return { err: { code: 404, message: 'error' } };
  return allSalesOpen;
};

const getAllSales = async () => {
  const allSales = await sales.findAll();
  if (!allSales) return { err: { code: 404, message: 'error' } };
  return allSales;
};

const getSaleById = async (id) => {
  if (!id) return { err: { code: 404, message: 'invalid id' } };
  const sale = await sales.findOne({ where: { id } });
  if (!sale) return { err: { code: 404, message: 'sale not found' } };
  return sale;
};

module.exports = {
  createSale,
  closeSale,
  getByUserId,
  getAllOpen,
  getAllSales,
  getSaleById,
  changeStatusSale,
};
