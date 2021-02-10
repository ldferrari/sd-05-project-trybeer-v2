'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('sale_products', {
      product_id: {
        allowNull: false, type: Sequelize.INTEGER, onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', references: { model: 'products', key: 'id' },
      },
      quantity: {
        type: Sequelize.INTEGER, allowNull: false,
      },
      sale_id: {
        allowNull: false, type: Sequelize.INTEGER, onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', references: { model: 'sales', key: 'id' },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sale_products');
  }
};
