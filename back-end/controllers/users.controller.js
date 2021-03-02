const { Router } = require('express');

const service = require('../services/users.service');
const requests = require('../services/usersRequests');
const TWOHUNDRED = 200;
const TWOHUNDREDANDONE = 201;


module.exports = ({ mongoConnection, mysqlConnection }) => {
  const user = Router();
  const { register, update, login } = service(
    mongoConnection,
    requests({ mysqlConnection }),
  );

  user.get('/', (_req, res) => {
    res.status(TWOHUNDRED).json({});
  });

  // endpoint de registro
  user.post('/register', register, (req, res) => {
    res.status(TWOHUNDREDANDONE).json(req.data);
  });

  user.post('/update', update, (req, res) => {
    res.status(TWOHUNDRED).json(req.data);
  });

  user.post('/', login, (req, res) => {
    res.status(TWOHUNDRED).json(req.data);
  });

  return user;
};
