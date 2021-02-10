module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: { autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true },
      name: { type: DataTypes.STRING },
      price: { type: DataTypes.FLOAT },
      url_image: { type: DataTypes.STRING },
    },
    { timestamps: false },
  );
  return Product;
};
