const { Router } = require('express');

const jwt = require('jsonwebtoken');

const service = require('../services/usersServices');

const secret = 'batatinhafrita';

const users = Router();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const duzentos = 200;
const duzentos1 = 201;
const quinhentos = 500;

users.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await service.logIn(email, password);
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return res.status(duzentos).json({ ...user, token });
  } catch (e) {
    console.log(e);
    res.status(e.err.code).json({ message: e.err.message });
  }
});

users.post('/register', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const userCreated = await service.createUser(req.body);
    const token = jwt.sign({ data: userCreated }, secret, jwtConfig);
    return res.status(duzentos1).json({ name, email, role, token });
  } catch (e) {
    console.log(e);
    res.status(quinhentos).json(e);
  }
});

users.put('/profile', async (req, res) => {
  try {
    const { name, email } = req.body;
    await service.updateUserName(name, email);
    res.status(duzentos).json({ message: 'name updated', name });
  } catch (e) {
    console.log(e);
    res.status(quinhentos).json(e);
  }
});

module.exports = users;
