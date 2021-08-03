const Joi = require("joi").extend(require("@joi/date"))

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
  date: Joi.date().format("YYYY-MM-DD").required(),
})

exports.incomeTransactionSchema = Joi.object({
  category: Joi.string().valid("salary", "others").required(),
  sum: Joi.number().required(),
  description: Joi.string().required(),
  date: Joi.date().format("YYYY-MM-DD").required(),
})
