const { Router } = require('express');
const rescue = require('express-rescue');
const userService = require('../services/userService');

const user = Router();

const successCode = 200;
const createdCode = 201;

user.post(
  '/login',
  rescue(async (req, res, next) => {
    const user = await userService.validationUser(req.body);
    if (user.error) {
      return next(user);
    }
    res.status(createdCode).json(user);
  }),
);

user.post('/register', rescue(async (req, res, next) => {
  const user = await userService.create(req.body);
  if (user.error) {
    return next(user);
  }
  const { password, ...userWithoutPassword } = user.dataValues;
  res.status(createdCode).json(userWithoutPassword);
}));

user.put('/profile/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const response = await userService.update(id, name);
  if (response.error) {
    next(response);
  }
  return res.status(successCode).json(response);
}));

module.exports = user;
