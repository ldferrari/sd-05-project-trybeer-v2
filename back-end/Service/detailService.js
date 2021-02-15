const products = require('../Controllers/productsController');
const { Sale_Product, Product } = require('../models');

const getDetails = async (saleId) => Sale_Product.findAll({ where: { sale_id: saleId }, 
  include: [{ model: Product, as: 'productData', attributes: ['id', 'name', 'price', 'url_image'] }]
});

module.exports = {
  getDetails,
};
