const { users } = require('../models');

async function userLogin(email, password) {
  if (!email || !password) return false;

  const user = await users.findOne({ where: { email } });

  if (!user || user.password !== password) return false;

  return user.dataValues;
}

module.exports = { userLogin };
