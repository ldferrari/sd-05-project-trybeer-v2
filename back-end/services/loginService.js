const { user: model } = require('../models');

const validateLog = async (email, password) => {
  const user = await model.findOne({ where: {email, password } });

  if (user === null) {
    return {
      error: true,
      code: 'invalid_info',
      message: 'Email or password invalid',
    };
  }
  return user;
};

module.exports = {
  validateLog,
};
