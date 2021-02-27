const { users } = require('../models');

const updateUser = async (name, email) =>
  users.update({ name, email }, { where: { email } });

module.exports = { updateUser };
