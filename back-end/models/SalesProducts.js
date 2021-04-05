const SaleProduct = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('SaleProduct', {
    quantity: {
      type: DataTypes.INTEGER
    },
  },
  { timestamps: false });

  saleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale,
      { as: 'Sale',
        foreignKey: 'productId', otherKey: 'saleId',through: saleProduct });

    models.Sale.belongsToMany(models.Product,
      { as: 'Product',
        foreignKey: 'saleId', otherKey: 'productId', through: saleProduct });
  };

  return saleProduct;
};

module.exports = SaleProduct;