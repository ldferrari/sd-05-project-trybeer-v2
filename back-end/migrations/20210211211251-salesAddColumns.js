'use strict';
const nove = 9;
const dois = 2;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('sales', 'total_price', {
        allowNull: false, type: Sequelize.DECIMAL(nove, dois)
      }),
      queryInterface.addColumn('sales', 'delivery_address', {
        type: Sequelize.STRING, allowNull: false,
      }),
      queryInterface.addColumn('sales', 'delivery_number', {
        type: Sequelize.STRING, allowNull: false,
      }),
      queryInterface.addColumn('sales', 'sales_date', {
        allowNull: false, type: Sequelize.DATE
      }),
      queryInterface.addColumn('sales', 'status', {
        allowNull: false, type: Sequelize.STRING
      }),
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sales');
  }
};
