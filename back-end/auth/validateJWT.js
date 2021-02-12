const jwt = require('jsonwebtoken');
const statusCode = require('../statusCode.js');
const secret = 'grupo6';

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(statusCode.gone).json({ message: 'Missing auth token' });
  try {
    jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(statusCode.gone).json({ message: err.message });
  }
};

module.exports = validateJWT;
