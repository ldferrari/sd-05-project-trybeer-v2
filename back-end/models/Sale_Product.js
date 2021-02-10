module.exports = (sequelize, DataTypes) => {
  const Sale_Product = sequelize.define(
    'Sale_Product',
    {
      sale_id: {
        type: DataTypes.INTEGER, foreignKey: true
     },
      product_id: { 
        type: DataTypes.INTEGER, foreignKey: true
      },
      quantity: { type: DataTypes.INTEGER },
    },
    { timestamps: false },
  );
  Sale_Product.associate = (models) => {
    Sale_Product.hasMany(models.Product,
      { foreignKey: 'product_id', as: 'productId' });
  };
  Sale_Product.associate = (models) => {
    Sale_Product.hasMany(models.Sale,
      { foreignKey: 'sale_id', as: 'saleId' });
  };
  return Sale_Product;
};
