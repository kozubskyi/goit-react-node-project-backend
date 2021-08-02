const { Router } = require("express");
const router = Router();
const { asyncWrapper } = require("../../middlewares/async-wrapper");
const { userSchema } = require("../../schemes/auth.schema");
const { validate } = require("../../middlewares/validation");
const { authService } = require("../../services/auth/auth.service");
const { authorize } = require("../../middlewares/authorize");
const { prepareUser } = require("../../serializers/user.serializer");
const { prepareUserWithToken } = require("../../serializers/auth.serializer");

router.post(
  "/sign-up",
  validate(userSchema),
  asyncWrapper(async (req, res, next) => {
    const user = await authService.signUp(req.body);
    return res.status(201).send(prepareUser(user));
  })
);

router.post(
  "/sign-in",
  validate(userSchema),
  asyncWrapper(async (req, res, next) => {
    const userWithToken = await authService.signIn(req.body);
    return res.status(200).send(prepareUserWithToken(userWithToken));
  })
);

router.post(
  "/sign-out",
  authorize,
  asyncWrapper(async (req, res, next) => {
    await authService.signOut(req.user);
    return res.status(204).json("The user is signed out");
  })
);

exports.authController = router;
