const Joi = require('@hapi/joi');

const THREE = 3;
const SIXTYFOUR = 64;

// prettier-ignore
const LOGIN_SCHEMA = Joi.object({
  email: Joi.string().email()
    .required(),
  password: Joi.string().min(THREE)
    .max(SIXTYFOUR)
    .required(),
});

// prettier-ignore
const REGISTER_SCHEMA = Joi.object({
  email: Joi.string().email()
    .required(),
  name: Joi.string().min(THREE)
    .max(SIXTYFOUR)
    .required(),
  password: Joi.string().min(THREE)
    .max(SIXTYFOUR)
    .required(),
  role: Joi.string().required(),
});

const UPDATE_SCHEMA = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(THREE).max(SIXTYFOUR).required(),
});

const validate = (data) => (schema) => {
  const { error } = schema.validate(data);
  if (error) throw new Error(error);
};

module.exports = {
  LOGIN_SCHEMA,
  REGISTER_SCHEMA,
  UPDATE_SCHEMA,
  validate,
};
