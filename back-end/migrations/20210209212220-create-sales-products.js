'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salesProductsTable = await queryInterface.createTable('sales_products', {
      sale_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'sales', key: 'id' },
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'products', key: 'id' },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
    return salesProductsTable;
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sales_products');
  }
};