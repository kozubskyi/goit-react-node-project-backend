const { Router } = require("express")
const router = Router()

const { authorize } = require("../middlewares/authorize")
const { validate } = require("../middlewares/validate")
const {
  expenseTransactionSchema,
  incomeTransactionSchema,
  transactionIdSchema,
} = require("../schemes/transactions.schemes")
const { asyncWrapper } = require("../middlewares/async-wrapper")
const { transactionsService } = require("../services/transactions.service")

router.post(
  "/expense",
  authorize,
  validate(expenseTransactionSchema),
  asyncWrapper(async (req, res, next) => {
    const updatedUser = await transactionsService.addExpenseTransaction(req.user, req.body)

    res.status(201).json({ balance: updatedUser.balance, expenses: updatedUser.transactions.expenses })
  })
)

router.post(
  "/income",
  authorize,
  validate(incomeTransactionSchema),
  asyncWrapper(async (req, res, next) => {
    const updatedUser = await transactionsService.addIncomeTransaction(req.user, req.body)

    res.status(201).json({ balance: updatedUser.balance, income: updatedUser.transactions.income })
  })
)

exports.transactionsController = router
