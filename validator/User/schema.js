const Joi = require('joi');

module.exports = {
  registerSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    username: Joi.string().required(),
  }),
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  updateUserSchema: Joi.object({
    username: Joi.string(),
    address: Joi.string(),
    fullName: Joi.string().min(2),
    phoneNumber: Joi.string().min(10),
  })
};