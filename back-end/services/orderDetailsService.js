const { SaleProduct, Sale, Product } = require('../models');
const dateFormat = require('dateformat');

const adjustResponse = (result, id) => ({
  saleId: id,
  sale_date: dateFormat(result.sale_date, 'dd/mm'),
  status: result.status,
  products: result.Product.map((prod) => ({
    name: prod.name,
    price: prod.price,
    quantity: prod.SaleProduct.quantity,
    total: prod.price * prod.SaleProduct.quantity,
  })),
});

const getOrderDetails = async (id) => {
  const result = await Sale.findAll({
    attributes: ['sale_date', 'status'],
    include:
    {
      model: Product,
      as: 'Product',
      attributes: ['name', 'price'],
      required: true,
      through: {
        model: SaleProduct,
        as: 'SaleProduct',
        attributes: ['quantity', 'saleId'],
        where: { saleId: id },
        required: true,
      }
    },
  });
  return adjustResponse(result[0], id);
};
// return result.map((data) => adjustResponse(data));



// const getOrderDetails = async (id) => SaleProduct.findAll()

module.exports = {
  getOrderDetails,
};
