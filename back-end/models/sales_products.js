const createSalesProducts = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('sales_products', {
    sale_id: { type: DataTypes.INTEGER, foreignKey: true },
    product_id: { type: DataTypes.INTEGER, foreignKey: true },
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });

  salesProducts.associate = (models) => {
    salesProducts.belongsTo(models.sales,
      { foreignKey: 'sale_id', as: 'sale' });
    salesProducts.belongsTo(models.products,
      { foreignKey: 'product_id', as: 'product' });
  };

  return salesProducts;
};

module.exports = createSalesProducts;