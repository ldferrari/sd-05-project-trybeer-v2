const Users = (sequelize, DataTypes) => {
  const users = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  });

  users.associate = (models) => {
    users.hasMany(models.sale, { foreignKey: 'user_id'});
  };
  
  return users;
};

module.exports = Users;
