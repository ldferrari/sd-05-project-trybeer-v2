'use strict';

const id = (Sequelize) => ({
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  allowNull: false
});

const name = (Sequelize) => ({
  type: Sequelize.STRING,
  allowNull: false
});

const email = (Sequelize) => ({
  type: Sequelize.STRING,
  allowNull: false,
  unique: true
});

const password = (Sequelize) => ({
  type: Sequelize.STRING,
  allowNull: false
});

const role = (Sequelize) => ({
  type: Sequelize.STRING,
  allowNull: false
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: id(Sequelize),
      name: name(Sequelize),
      email: email(Sequelize),
      password: password(Sequelize),
      role: role(Sequelize),
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
