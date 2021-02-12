'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersTable = await queryInterface.createTable('users', {
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
    });
    return usersTable;
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
