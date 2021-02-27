function Sales(sequelize, DataTypes) {
  const sale = sequelize.define(
    'sales',
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      total_price: { type: DataTypes.FLOAT, allowNull: false },
      delivery_address: { type: DataTypes.STRING, allowNull: false },
      delivery_number: { type: DataTypes.STRING, allowNull: false },
      sale_date: { type: DataTypes.STRING, defaultValue: DataTypes.NOW },
      status: { type: DataTypes.STRING, defaultValue: 'Pendente' },
    },
    { timestamps: false },
  );

  sale.associate = (models) => {
    sale.belongsTo(models.users, { foreignKey: 'id', as: 'user' });
  };

  return sale;
};

module.exports = Sales;
