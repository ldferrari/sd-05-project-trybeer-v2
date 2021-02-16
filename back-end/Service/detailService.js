const { Sale_Product, Product } = require('../models');

const getDetails = async (saleId) => Sale_Product.findAll({ where: { sale_id: saleId },
  include: [{ model: Product, as: 'productData', attributes: ['id', 'name', 'price'] }]
});
/* const getDetails = async (saleId) => Sale_Product.findAll({ where: { sale_id: saleId },
  include: [{model: Product}]
}); */

module.exports = {
  getDetails,
};
