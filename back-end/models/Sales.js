module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      total_price: { type: DataTypes.FLOAT },
      delivery_address: { type: DataTypes.STRING },
      delivery_number: { type: DataTypes.INTEGER },
      sale_date: { type: DataTypes.DATE },
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      update_date: { type: DataTypes.DATE },
      status: { type: DataTypes.STRING },
    },
    { timestamps: false },
  );
  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };
  /* Sale.associate = (models) => {
    Sale.hasTo(models.Product,
      { foreignKey: 'productId', as: 'user' });
  }; */
  return Sale;
};
