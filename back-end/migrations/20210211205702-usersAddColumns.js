'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('sales', 'delivery_address', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('sales', 'delivery_number', {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('sales', 'sales_date', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('sales', 'status', {
        allowNull: false,
        type: Sequelize.STRING,
      })
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
