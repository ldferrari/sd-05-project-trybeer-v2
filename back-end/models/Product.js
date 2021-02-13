const Products = (sequelize, DataTypes) => {
  const Products = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    url_image: DataTypes.STRING,
  });

  Products.associate = (models) => {
    Products.hasMany(models.sale_product, { foreignKey: 'product_id', as: 'sale' });
  };

  return Products;
};

module.exports = Products;
