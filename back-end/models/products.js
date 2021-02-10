const createProducts = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true},
    price: DataTypes.DECIMAL(4,2),
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
