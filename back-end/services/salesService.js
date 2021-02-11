const { sales, users } = require('../models');

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

/*
const checkCreatedSale = (createdSale) => {
  if (!createdSale.dataValues) {
    const err = { err: { code: 401, message: 'error' } };
    throw err;
  }
  return;
};
*/

const createSale = async ({ email, totalPrice, address, addressNumber, saleDate, products }) => {
  const dados = await getDados(email, totalPrice, address, addressNumber, saleDate);
  if (dados.err) return dados;
  const { user_id, sales_date, total_price, delivery_address, delivery_number } = dados;
  const createdSale = await sales.create({ user_id, total_price, delivery_address, delivery_number, sales_date, status: 'Pendente' });
  console.log(createdSale.dataValues);
  /* checkCreatedSale(createdSale);


  const insertedId = createdSale[0].insertId;

  products.forEach(async (product) => {
    await salesProductsModel.createSalesProducts(insertedId,
      product.product_id || product.id, product.quantity);
  });
  */


  return createdSale;
};

const closeSale = async (body) => {
  const { id } = body;

  if (!id) {
    const err = { err: { code: 404, message: 'sale id is invalid' } };
    throw err;
  }

  return model.closeSale(id);
};

const getByUserId = async (body) => {
  const { email } = body;

  if (!email) {
    const err = { err: { code: 404, message: 'email is invalid' } };
    throw err;
  }

  const userFound = await usersModel.logIn(email);
  const { id } = userFound[0];

  const userSales = await model.getByUserId(id);

  if (!userSales) {
    const err = { err: { code: 404, message: 'error' } };
    throw err;
  }

  return userSales[0];
};

const getAllOpen = async () => {
  const allSalesOpen = await model.getAllOpen();

  if (!allSalesOpen) {
    const err = { err: { code: 404, message: 'error' } };
    throw err;
  }

  return allSalesOpen[0];
};

const getAllSales = async () => {
  const allSales = await model.getAll();

  if (!allSales) {
    const err = { err: { code: 404, message: 'error' } };
    throw err;
  }

  return allSales[0];
};

const getSaleById = async (id) => {
  if (!id) {
    const err = { err: { code: 404, message: 'invalid id' } };
    throw err;
  }

  const sale = await model.getSaleById(id);

  if (!sale) {
    const err = { err: { code: 404, message: 'sale not found' } };
    throw err;
  }

  return sale[0];
};

module.exports = {
  createSale,
  closeSale,
  getByUserId,
  getAllOpen,
  getAllSales,
  getSaleById,
};
