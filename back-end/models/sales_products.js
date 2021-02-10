const createSales = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('sales_products', {
    sale_id: { type: DataTypes.INTEGER, foreignKey: true },
    product_id: { type: DataTypes.INTEGER, foreignKey: true },
    quantity: DataTypes.STRING,
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

  return sales;
};

module.exports = createSales;