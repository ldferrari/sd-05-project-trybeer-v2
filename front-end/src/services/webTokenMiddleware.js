const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.SECRET || 'secretPassword';
const jwtConfig = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const verifyToken = (token) => {
  const payload = jwt.verify(token, secret);
  console.log('payload.id====>', payload.id);
  return payload;
};

module.exports = {
  createToken,
  verifyToken,
};
