'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      sale_id: {
        type: Sequelize.INTEGER,
        primary_key: true,
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
        references: { model: 'sales', key: 'id' },
      },
      product_id: {
        type: Sequelize.INTEGER,
        primary_key: true,
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
        references: { model: 'products', key: 'id' },
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
    },
    { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales_products');
  },
};
