const Product = (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    url_image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  // product.associate = (models) => {
  //   product.belongsTo(models.SaleProduct, { as: 'saleProduct', foreignKey: 'productId' });
  // };

  return product;
};

module.exports = Product;