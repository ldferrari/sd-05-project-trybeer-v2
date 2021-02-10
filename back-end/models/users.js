const createUsers = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  users.associate = (models) => {
    users.hasOne(models.sales,
      { foreignKey: 'user_id', as: 'user' });
  };

  return users;
};

module.exports = createUsers;