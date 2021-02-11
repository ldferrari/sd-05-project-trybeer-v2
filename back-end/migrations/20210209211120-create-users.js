'use strict';

const constraints = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: Sequelize.STRING,
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING
  },
  role: {
    allowNull: false,
    type: Sequelize.STRING
  }
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersTable = await queryInterface.createTable('users', constraints);
    return usersTable;
  },

  down: async (queryInterface) => { 
    await queryInterface.dropTable('users');
  }
};
