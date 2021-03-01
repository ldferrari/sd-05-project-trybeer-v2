'use strict';

const id = (Sequelize) => ({
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  allowNull: false
});

const name = (Sequelize) => ({
  type: Sequelize.STRING,
  allowNull: false
});

const price = (Sequelize) => ({
  type: Sequelize.FLOAT,
  allowNull: false,
});

const url_image = (Sequelize) => ({
  type: Sequelize.STRING,
  allowNull: false
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: id(Sequelize),
      name: name(Sequelize),
      price: price(Sequelize),
      url_image: url_image(Sequelize),
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};
