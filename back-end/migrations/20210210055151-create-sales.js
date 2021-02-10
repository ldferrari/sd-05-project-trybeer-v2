'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      total_price: { type: Sequelize.STRING, allowNull: false },
      delivery_address: { type: Sequelize.STRING, allowNull: false },
      delivery_number: { type: Sequelize.STRING, allowNull: false },
      sale_date: { type: Sequelize.DATE, allowNull: false },
      status: { type: Sequelize.STRING, allowNull: false },
    },
    { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};
