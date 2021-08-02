const { Router } = require("express")
const router = Router()

const { validate } = require("../middlewares/validate")
const { balanceSchema } = require("../schemes/balance.schema")
const { asyncWrapper } = require("../middlewares/async-wrapper")
const { balanceService } = require("../services/balance.service")

router.post(
  "/:userId",
  validate(balanceSchema),
  asyncWrapper(async (req, res, next) => {
    await balanceService.setBalance(req.body.balance, req.params.userId)

    res.status(201).json({ message: "User balance has been updated" })
  })
)

exports.balanceController = router
