const Joi = require("joi").extend(require("@joi/date"))

const expenseCategories = [
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
  "others",
]

const incomeCategories = ["salary", "others"]

exports.expenseTransactionSchema = Joi.object({
  type: Joi.string().valid("expense").required(),
  category: Joi.string()
    .valid(...expenseCategories)
    .required(),
  sum: Joi.number().required(),
  description: Joi.string().required(),
  date: Joi.date().format("DD.MM.YYYY").required(),
})

exports.incomeTransactionSchema = Joi.object({
  type: Joi.string().valid("income").required(),
  category: Joi.string()
    .valid(...incomeCategories)
    .required(),
  sum: Joi.number().required(),
  description: Joi.string().required(),
  date: Joi.date().format("DD.MM.YYYY").required(),
})

exports.periodSchema = Joi.object({
  period: Joi.date().format("MM.YYYY").required(),
})
