const createProducts = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
    total_price: DataTypes.DECIMAL(9,2),
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sales_date: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users,
      { foreignKey: 'user_id', as: 'user' });
  };

  return sales;
};

module.exports = createSales;
