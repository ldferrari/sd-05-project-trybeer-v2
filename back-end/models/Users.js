function Users(sequelize, DataTypes) {
  const users = sequelize.define(
    'Users',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return users;
}

module.exports = Users;
