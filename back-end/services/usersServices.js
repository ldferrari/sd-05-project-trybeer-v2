const { users } = require('../models');
const seis = 6;
const doze = 12;

const regexName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
const regexEmail = /\S+@\S+\.\S+/;

const nameFormat = (name) => {
  if (!name.match(regexName) || name.length < doze) {
    const err = { err: { code: 404, message: 'name format invalid' } };
    throw err;
  }
};

const emailFormat = (email) => {
  if (!email.match(regexEmail)) {
    const err = { err: { code: 404, message: 'email format invalid' } };
    throw err;
  }
};

const passwordFormat = (password) => {
  if (password.length < seis) {
    const err = { err: { code: 404, message: 'password format invalid' } };
    throw err;
  }
};

const emailExists = async (email) => { 
  await users.findOne({ where: { email } }); 
  /*se essa busca não acha o email, o retorno é null. 
  Se ele achar algum email repetido, o proprio sequelize faz um throw de erro*/
};

const createUser = async (newUser) => {
  const { name, email, password, role } = newUser;
  nameFormat(name);
  emailFormat(email);
  passwordFormat(password);
  emailExists(email);
  const createdUser = await users.create({ name, email, password, role });
  return createdUser.dataValues;
};

const logIn = async (email, password1) => {
  const userFound = await users.findOne({ where: { email } });
  if (userFound === null) {
    const err = { err: { code: 404, message: 'user email do not exist' } };
    throw err;
  }
  const { dataValues } = userFound;
  if (password1 !== dataValues.password) {
    const err = { err: { code: 401, message: 'password incorrect' } };
    throw err;
  }
  const { id, password, ...user } = dataValues;
  return user;
};

const updateUserName = async (name, email) => {
  nameFormat(name);
  const newName = await users.update({ name }, { where: { email } });
  return newName;
};

// logIn('tryber@trybe.com.br', '123456');

module.exports = {
  createUser,
  logIn,
  updateUserName,
};
