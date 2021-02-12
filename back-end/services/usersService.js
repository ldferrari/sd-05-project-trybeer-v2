// const model = require('../models/sql/usersModel');
const { user: model } = require('../models');

const checkUser = async (email) => {
  const user = await model.findOne({ where: { email }});
  if (user !== null) {
    return {
      error: true,
      statusCode: 409,
      message: 'E-mail already in database.',
    };
  }
  return false;
};

const createUser = async (name, email, password, checkbox) => {
  const userExists = await checkUser(email);
  if (userExists.error) return userExists;

  if (!name || !email || !password) {
    return {
      error: true,
      message: 'Missing information, please try again.',
      statusCode: 400,
    };
  }
  const role = checkbox ? 'administrator' : 'client';
  await model.create({name, email, password, role});
  return role;
};

const updateUser = async (newName, email) => {
  await model.update({ name: newName }, {
    where: {
      email
    }
  });
};

const getUserByEmail = async (email) => {
  const user = await model.findOne({ where: { email } });
  return user.dataValues.name;
};

const getUserId = async (email) => {
  const user = await model.findOne({where: { email }});
  if (user === null) {
    return {
      error: true,
      statusCode: 400,
      message: 'User not found',
    };
  }
  return user.dataValues.id;
};

module.exports = {
  checkUser,
  createUser,
  updateUser,
  getUserByEmail,
  getUserId,
};
