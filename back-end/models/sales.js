const nove = 9;
const dois = 2;

const createSales = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
    total_price: DataTypes.DECIMAL(nove,dois),
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sales_date: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  sales.associate = (models) => {
    sales.belongsTo(models.users,
      { foreignKey: 'user_id', as: 'user' });
    sales.hasOne(models.sales_products,
      { foreignKey: 'sale_id', as: 'sale' });
  };
  return sales;
};

module.exports = createSales;
