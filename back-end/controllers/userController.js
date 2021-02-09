const { Router } = require('express');

const userService = require('../services/userService');
const authToken = require('../middlewares/authToken');

const usersRouter = Router();
const status400 = 400;
const status200 = 200;

usersRouter.put('/name', authToken, async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) return res.status(status400).json({ message: 'Invalid data' });

  await userService.updateUser(name, email);

  return res.status(status200).json({ message: 'Name updated successfully!' });
});

module.exports = usersRouter;
