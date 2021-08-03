const Joi = require("joi").extend(require("@joi/date"))

exports.expenseTransactionSchema = Joi.object({
  type: Joi.string().valid("expense").required(),
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
  date: Joi.date().format("DD.MM.YYYY").required(),
  // owner: Joi.required(),
})

exports.incomeTransactionSchema = Joi.object({
  type: Joi.string().valid("income").required(),
  category: Joi.string().valid("salary", "others").required(),
  sum: Joi.number().required(),
  description: Joi.string().required(),
  date: Joi.date().format("DD.MM.YYYY").required(),
  // owner: Joi.required(),
})

exports.monthSchema = Joi.object({
  month: Joi.date().format("MM-YYYY").required(),
})
