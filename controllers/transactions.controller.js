const { Router } = require("express")
const router = Router()

const { authorize } = require("../middlewares/authorize")
const { validate } = require("../middlewares/validate")
const { expenseTransactionSchema, incomeTransactionSchema, periodSchema } = require("../schemes/transactions.schemes")
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
  "/expenses/summary",
  authorize,
  asyncWrapper(async (req, res, next) => {
    const summary = await transactionsService.getSummary(req.user._id, "expense")

    res.status(200).json({ summary })
  })
)

router.get(
  "/income/summary",
  authorize,
  asyncWrapper(async (req, res, next) => {
    const summary = await transactionsService.getSummary(req.user._id, "income")

    res.status(200).json({ summary })
  })
)

router.get(
  "/:period",
  authorize,
  validate(periodSchema, "params"),
  asyncWrapper(async (req, res, next) => {
    const info = await transactionsService.getInfoForPeriod(req.user._id, req.params.period)

    res.status(200).json({ info })
  })
)

exports.transactionsController = router
