const { registerSchema, loginSchema, updateUserSchema } = require("./schema");

function validateRegisterSchema(payload) {
  const validateResult = registerSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

function validateLoginSchema(payload) {
  const validateResult = loginSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

function validateUpdateUserSchema(payload) {
  const validateResult = updateUserSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

module.exports = { 
  validateRegisterSchema, 
  validateLoginSchema, 
  validateUpdateUserSchema 
};