// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const createUsers = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: {type: DataTypes.STRING, defaultValue: 'algum nome'},
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