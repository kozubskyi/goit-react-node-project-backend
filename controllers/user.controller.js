const { Router } = require("express")
const router = Router()

const { asyncWrapper, validate, authorize } = require("../middlewares/middlewares")
const { balanceSchema } = require("../validation/schemes/balance.schema")
const { userService } = require("../services/user.service")

router.post(
  "/balance",
  authorize,
  validate(balanceSchema),
  asyncWrapper(async (req, res, _) => {
    const balance = await userService.setBalance(req.user._id, req.body.balance)

    res.status(200).json({ balance })
  })
)

exports.userController = router
