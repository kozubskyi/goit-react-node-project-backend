const { Router } = require("express")
const router = Router()

const { authorize } = require("../middlewares/authorize")
const { validate } = require("../middlewares/validate")
const { balanceSchema } = require("../schemes/balance.schema")
const { asyncWrapper } = require("../middlewares/async-wrapper")
const { balanceService } = require("../services/balance.service")

router.post(
  "/",
  authorize,
  validate(balanceSchema),
  asyncWrapper(async (req, res, next) => {
    const balance = await balanceService.setBalance(req.user._id, req.body.balance)

    res.status(200).json({ balance })
  })
)

exports.balanceController = router
