const Sale = (sequelize, DataTypes) => {
  const sale = sequelize.define('Sale', {
    total_price: DataTypes.FLOAT,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.INTEGER,
    sale_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pendente',
    },
  },
  { timestamps: false });
  sale.associate = (models) => {
    sale.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };
  return sale;
};

module.exports = Sale;