'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      delivery_address: { type: Sequelize.STRING, allowNull: false, },
      delivery_number: { type: Sequelize.INTEGER, allowNull: false,},
      sale_date: { type: Sequelize.DATE, allowNull: false, },
      status: { type: Sequelize.STRING, allowNull: false, },
      total_price: { type: Sequelize.DOUBLE, allowNull: false, },
      user_id: {
        allowNull: false, type: Sequelize.INTEGER, onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', references: { model: 'users', key: 'id' },
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sales'); 
  },
};
