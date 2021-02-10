'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salesTable = await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
      },
      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(9,2)
      },
      delivery_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivery_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sales_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
    return salesTable;
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sales');
  }
};
