const { Router } = require("express")
const router = Router()

const { validate } = require("../middlewares/validate")
const { balanceSchema } = require("../schemes/balance.schema")
const { authorize } = require("../middlewares/authorize")
const { asyncWrapper } = require("../middlewares/async-wrapper")
const { balanceService } = require("../services/balance.service")

router.post(
  "/",
  authorize,
  validate(balanceSchema),
  asyncWrapper(async (req, res, next) => {
    await balanceService.setBalance(req.user._id, req.body.balance)

    res.status(201).json({ message: "User balance has been updated" })
  })
)

exports.balanceController = router
