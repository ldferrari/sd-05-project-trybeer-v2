'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productsTable = await queryInterface.createTable('products', {
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
        type: Sequelize.DECIMAL(4,2),
      },
      url_image: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "",
      },
    });
    return productsTable;
  },

  down: async (queryInterface) => { 
    await queryInterface.dropTable('products');
  }
};