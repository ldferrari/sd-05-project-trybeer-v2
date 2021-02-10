const model = require('../models/sql/loginModel');

const validateLog = async (email, password) => {
  const user = await model.validateLog(email, password);

  if (user === undefined) {
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
