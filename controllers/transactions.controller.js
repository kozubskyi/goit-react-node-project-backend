const { Router } = require("express")
const router = Router()

const { asyncWrapper, validate, authorize, createSchema } = require("../middlewares/middlewares")
const { validateTransaction } = require("../validation/validate-transaction")
const { typeSchema, summarySchema, periodSchema } = require("../validation/schemes/transactions.schemes")
const { transactionsService } = require("../services/transactions.service")

router.post(
  "/",
  authorize,
  validateTransaction,
  asyncWrapper(async (req, res, _) => {
    const transaction = await transactionsService.addTransaction(req.user._id, req.body)

    const response = {
      message: "Transaction has been created",
      transaction,
    }

    res.status(201).json(response)
  })
)

router.delete(
  "/:id",
  authorize,
  validate(createSchema("id"), "params"),
  asyncWrapper(async (req, res, _) => {
    await transactionsService.deleteTransaction(req.user._id, req.params.id)

    res.status(200).json({ message: "Transaction has been deleted" })
  })
)

router.get(
  "/:type",
  authorize,
  validate(typeSchema, "params"),
  asyncWrapper(async (req, res, _) => {
    const transactions = await transactionsService.getTransactions(req.user._id, req.params.type)

    res.status(200).json(transactions)
  })
)

router.get(
  "/summary/:type/:year",
  authorize,
  validate(summarySchema, "params"),
  asyncWrapper(async (req, res, _) => {
    const summary = await transactionsService.getSummary(req.user._id, req.params)

    res.status(200).json(summary)
  })
)

router.get(
  "/:type/:period",
  authorize,
  validate(periodSchema, "params"),
  asyncWrapper(async (req, res, _) => {
    const transactions = await transactionsService.getTransactionsForPeriod(req.user._id, req.params)

    res.status(200).json(transactions)
  })
)

exports.transactionsController = router
