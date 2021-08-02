const Joi = require("joi")

exports.expenseTransactionSchema = Joi.object({
  category: Joi.string()
    .valid(
      "products",
      "alcohol",
      "entertainment",
      "health",
      "transport",
      "allForHome",
      "technics",
      "communalAndConnection",
      "sportAndHobbies",
      "education",
      "others"
    )
    .required(),
  sum: Joi.number().required(),
  description: Joi.string().required(),
})

exports.incomeTransactionSchema = Joi.object({
  category: Joi.string().valid("salary", "others").required(),
  sum: Joi.number().required(),
  description: Joi.string().required(),
})

exports.transactionIdSchema = Joi.object({
  id: Joi.string().required(),
})
