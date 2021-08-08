const Joi = require("joi");

exports.userSchema = Joi.object({
  email: Joi.string()
    .email()
    .trim(true)
    .required(),
  password: Joi.string()
    .min(8)
    .trim(true)
    .required()
});
