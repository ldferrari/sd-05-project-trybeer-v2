'use strict';

const id = (Sequelize) => ({
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  allowNull: false
});

const userId = (Sequelize) => ({
  type: Sequelize.INTEGER,
  allowNull: false,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  references: {
    model: 'Users',
    key: 'id',
  },
});

const total_price = (Sequelize) => ({
  type: Sequelize.FLOAT,
  allowNull: false,
});

const delivery_address = (Sequelize) => ({
  type: Sequelize.STRING,
  allowNull: false,
});

const delivery_number = (Sequelize) => ({
  type: Sequelize.INTEGER,
  allowNull: false,
});

const sale_date = (Sequelize) => ({
  type: Sequelize.DATE,
  allowNull: false,
});

const status = (Sequelize) => ({
  type: Sequelize.STRING,
  allowNull: false,
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sales', {
      id: id(Sequelize),
      userId: userId(Sequelize),
      total_price: total_price(Sequelize),
      delivery_address: delivery_address(Sequelize),
      delivery_number: delivery_number(Sequelize),
      sale_date: sale_date(Sequelize),
      status: status(Sequelize),
    },
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sales');
  }
};
