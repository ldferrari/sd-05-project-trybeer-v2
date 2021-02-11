'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'password', {
        allowNull: false,
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('users', 'role', {
        allowNull: false,
        type: Sequelize.STRING,
      })
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};

