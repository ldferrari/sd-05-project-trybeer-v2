const jwt = require('jsonwebtoken');

const { users } = require('../models');
const createToken = require('./createToken');

const length = 6;

const createUser = async (name, email, password, role) => {
  const thisEmailAlreadyExists = await users.findOne({ where: { email } });

  if (thisEmailAlreadyExists) {
    throw new Error('invalid_email');
  }

  if (typeof name !== 'string' || typeof email !== 'string' || password.length < length) {
    throw new Error('invalid_data');
  }

  const payload = { issuer: 'post-api', audience: 'identity', name, email, role };

  await users.create({ name, email, password, role });

  const token = await createToken(payload);
  const user = jwt.decode(token);

  return { user, token };
};

module.exports = { createUser };
