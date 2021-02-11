const { users } = require('../models');

const updateUser = async (editName, email) =>
  users.update({ editName, email }, { where: { name: editName, email } });

module.exports = { updateUser };
