const { Router } = require('express');
const registerService = require('../services/registerService');

// https://bit.ly/2VxAplp
const registerRouter = Router();
const status400 = 400;
const status200 = 200;
const status422 = 422;
const status500 = 500;

registerRouter.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const newUser = await registerService.createUser(name, email, password, role);

    res.status(status200).json(newUser);
  } catch (err) {
    if (err.message === 'invalid_email') {
      console.log(err);
      return res.status(status422).json({ message: 'E-mail already in database.' });
    }

    if (err.message === 'invalid_data') {
      return res.status(status400).json({ message: 'Registration failed!' });
    }

    res.status(status500).json({ message: 'Something went wrong!' });
  }
});

module.exports = registerRouter;
