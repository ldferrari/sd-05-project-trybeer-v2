const Sales = (sequelize, DataTypes) => {
  const sales = sequelize.define('sale', {
    user_id: DataTypes.NUMBER,
    total_price: DataTypes.DOUBLE,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.NUMBER,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  });
  sales.associate = (models) => {
    sales.belongsTo(models.user, { foreignKey: 'user_id'});
    sales.hasMany(models.sale_product, { foreignKey: 'sale_id'});
  };

  return sales;
};

module.exports = Sales;
