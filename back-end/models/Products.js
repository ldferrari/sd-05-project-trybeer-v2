function Products(sequelize, DataTypes) {
  const products = sequelize.define('Products', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    url_image: DataTypes.STRING,
  });

  return products;
}

module.exports = Products;
