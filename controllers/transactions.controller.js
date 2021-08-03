const { Router } = require("express")
const router = Router()

const { authorize } = require("../middlewares/authorize")
const { validate } = require("../middlewares/validate")
const { expenseTransactionSchema, incomeTransactionSchema, monthSchema } = require("../schemes/transactions.schemes")
const { asyncWrapper } = require("../middlewares/async-wrapper")
const { transactionsService } = require("../services/transactions.service")
const { createSchema } = require("../middlewares/create-schema")

router.post(
  "/expenses",
  authorize,
  validate(expenseTransactionSchema),
  asyncWrapper(async (req, res, next) => {
    const transaction = await transactionsService.addTransaction(req.user._id, req.body)

    res.status(201).json(transaction)
  })
)

router.post(
  "/income",
  authorize,
  validate(incomeTransactionSchema),
  asyncWrapper(async (req, res, next) => {
    const transaction = await transactionsService.addTransaction(req.user._id, req.body)

    res.status(201).json(transaction)
  })
)

router.delete(
  "/:transactionId",
  authorize,
  validate(createSchema("transactionId"), "params"),
  asyncWrapper(async (req, res, next) => {
    await transactionsService.deleteTransaction(req.user._id, req.params.transactionId)

    res.status(200).json({ message: "Transaction has been deleted" })
  })
)

router.get(
  "/expenses/:month",
  authorize,
  validate(monthSchema, "params"),
  asyncWrapper(async (req, res, next) => {
    const expenses = await transactionsService.getTransactionsByMonth(req.user._id, req.params.month, "expense")

    res.status(200).json({ expenses })
  })
)

router.get(
  "/income/:month",
  authorize,
  validate(monthSchema, "params"),
  asyncWrapper(async (req, res, next) => {
    const income = await transactionsService.getTransactionsByMonth(req.user._id, req.params.month, "income")

    res.status(200).json({ income })
  })
)

exports.transactionsController = router
