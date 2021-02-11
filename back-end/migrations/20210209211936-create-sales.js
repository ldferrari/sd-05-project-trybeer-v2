'use strict';

const nove = 9;
const dois = 2;

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
    });
    return salesTable;
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sales');
  }
};
