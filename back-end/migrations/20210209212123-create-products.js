'use strict';

const quatro = 4;
const dois = 2;

const constraints = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },
  price: {
    allowNull: false,
    type: Sequelize.DECIMAL(quatro,dois),
  },
  url_image: {
    allowNull: false,
    type: Sequelize.STRING,
    defaultValue: '',
  },
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productsTable = await queryInterface.createTable('products', constraints);
    return productsTable;
  },

  down: async (queryInterface) => { 
    await queryInterface.dropTable('products');
  }
};
