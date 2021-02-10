const { Product } = require('../models');

const getAll = async () => await Product.findAll();

module.exports = {
  getAll,
};
