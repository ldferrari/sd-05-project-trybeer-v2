const { Sale_Product, Product, Sale } = require('../models');

const getOrders = async (userId) => Sale.findAll({ where: { userId } });

const getDetails = async (saleId) => {
// solução alternativa até o sequelize many to many funcionar
  const saidaBruta = (await Sale_Product.findAll({ where: { sale_id: saleId },
  // include: [{ model: Product, as: 'productData', attributes: ['id', 'name', 'price'] }],
  })).map(e=>e.dataValues);
  const saidaStatus = await Sale.findOne({ where: { id: saleId },
    // include: [{ model: Product, as: 'productData', attributes: ['id', 'name', 'price'] }],
  });
  const listaProdutos = (await Product.findAll()).map(e=>e.dataValues);
  console.log(listaProdutos)
  const objProduto = listaProdutos.reduce((a, c) => ({ ...a, ...{ [c.id]: c } }), {});
  console.log('objProduto',objProduto)
  console.log('saidaBruta', saidaBruta)
  const teste = saidaBruta.map(({ id, sale_id, product_id, quantity }) => (
    {
      id,
      sale_id,
      product_id,
      quantity,
      name: objProduto[product_id].name,
      price: objProduto[product_id].price,
      status: saidaStatus.status,
    }));
  return teste;
};
/* const getDetails = async (saleId) => Sale_Product.findAll({ where: { sale_id: saleId },
  include: [{model: Product}]
}); */

module.exports = {
  getDetails,
  getOrders,
};
