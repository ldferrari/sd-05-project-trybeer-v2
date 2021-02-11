const createProducts = (sequelize, DataTypes) => {
  const dois = 2;
  const quatro= 4;
  const products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true},
    price: DataTypes.DECIMAL(quatro,dois),
    url_image: { type: DataTypes.STRING, defaultValue: '' },
  },
  {
    timestamps: false,
  });

  products.associate = (models) => {
    products.hasOne(models.sales_products,
      { foreignKey: 'product_id', as: 'product' });
  };

  return products;
};

module.exports = createProducts;
