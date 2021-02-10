function Products(sequelize, DataTypes) {
  const products = sequelize.define(
    'Products',
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      url_image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return products;
}

module.exports = Products;
