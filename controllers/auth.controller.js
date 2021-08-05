const { Router } = require("express");
const router = Router();

const { asyncWrapper } = require("../middlewares/async-wrapper");
const { userSchema } = require("../schemes/auth.schema");
const { validate } = require("../middlewares/validate");
const { authService } = require("../services/auth.service");
const { authorize } = require("../middlewares/authorize");
const { prepareUser } = require("../serializers/user.serializer");
const { prepareUserWithToken } = require("../serializers/auth.serializer");

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *   type:object
 *     required:
 *      properties:
 *       id:
 *        type:string
 *        description:The auto-generated id of the user
 *         email:
 *          type:string
 *          description:The email of the user
 *        example:
 *         id:610a804086a24935c94d0ffa
 *         email:anastasiia@gmail.com
 */

router.post(
  "/signup",
  validate(userSchema),
  asyncWrapper(async (req, res, next) => {
    const user = await authService.signUp(req.body);
    return res.status(201).send(prepareUser(user));
  })
);

router.post(
  "/signin",
  validate(userSchema),
  asyncWrapper(async (req, res, next) => {
    const userWithToken = await authService.signIn(req.body);
    return res.status(200).send(prepareUserWithToken(userWithToken));
  })
);

router.post(
  "/signout",
  authorize,
  asyncWrapper(async (req, res, next) => {
    await authService.signOut(req.user);
    return res.status(204).json({ message: "The user is signed out" });
  })
);

exports.authController = router;
