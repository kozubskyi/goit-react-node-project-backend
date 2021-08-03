const { Router } = require("express")
const router = Router()

const { authorize } = require("../middlewares/authorize")
const { validate } = require("../middlewares/validate")
const { expenseTransactionSchema, incomeTransactionSchema } = require("../schemes/transactions.schemes")
const { asyncWrapper } = require("../middlewares/async-wrapper")
const { transactionsService } = require("../services/transactions.service")
const { createSchema } = require("../middlewares/create-schema")

router.post(
  "/expenses",
  authorize,
  validate(expenseTransactionSchema),
  asyncWrapper(async (req, res, next) => {
    const { balance, transactions } = await transactionsService.addExpenseTransaction(req.user, req.body)

    res.status(201).json({ balance, expenses: transactions.expenses })
  })
)

router.post(
  "/income",
  authorize,
  validate(incomeTransactionSchema),
  asyncWrapper(async (req, res, next) => {
    const { balance, transactions } = await transactionsService.addIncomeTransaction(req.user, req.body)

    res.status(201).json({ balance, income: transactions.income })
  })
)

router.delete(
  "/delete/:transactionId",
  authorize,
  validate(createSchema("transactionId"), "params"),
  asyncWrapper(async (req, res, next) => {
    const { balance, transactions } = await transactionsService.deleteTransaction(req.user, req.params.transactionId)

    res.status(200).json({ balance, transactions })
  })
)

router.get(
  "/expenses/:month",
  authorize,
  validate(createSchema("month"), "params"),
  asyncWrapper(async (req, res, next) => {
    const expenses = await transactionsService.getTransactionsByMonth(req.user.transactions.expenses, req.params.month)

    res.status(200).json({ expenses })
  })
)

router.get(
  "/income/:month",
  authorize,
  validate(createSchema("month"), "params"),
  asyncWrapper(async (req, res, next) => {
    const income = await transactionsService.getTransactionsByMonth(req.user.transactions.income, req.params.month)

    res.status(200).json({ income })
  })
)

exports.transactionsController = router
