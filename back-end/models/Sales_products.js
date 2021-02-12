const Sales_products = (sequelize, DataTypes) => {
  const salesproducts = sequelize.define('sale_product', {
    sale_id: DataTypes.NUMBER,
    products_id: DataTypes.NUMBER,
    quantity: DataTypes.NUMBER,
  });

  salesproducts.associate = (models) => {
    salesproducts.belongsTo(models.sale, { foreignKey: 'sale_id'});
    salesproducts.belongsTo(models.product, { foreignKey: 'product_id'});
  };
  return salesproducts;
};
module.exports = Sales_products;
