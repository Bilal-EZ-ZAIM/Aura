const { check } = require("express-validator");
const handelParamesError = require("../../middlewares/HandelParamesError");
const UserModel = require("../../model/UserModel");
const ValiditUserId = [
  check("id").isMongoId().withMessage("Id is not fond"),
  handelParamesError,
];

const ValiditeCreat = [
  check("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3 })
    .withMessage("Too Short username")
    .isLength({ max: 50 })
    .withMessage("Too long username"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Forma not email")
    .custom(async (val) => {
      await UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email already in user"));
        }
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Too Short Password"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("confirmPassword is required")
    .isLength({ min: 8 })
    .withMessage("Too Short confirmPassword")
    .custom((value, { req }) => {
      if (req.body.password !== value) {
        throw new Error("confirmPassword is falus");
      }
      return true;
    }),
  check("imgProfile").optional().isString().withMessage("imgProfile is String"),
  check("bio")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too Short bio")
    .isLength({ max: 100 })
    .withMessage("Too long bio"),
  handelParamesError,
];

const ValiditePassworUpdit = [
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Too Short Password"),
  check("newPassword")
    .notEmpty()
    .withMessage("newPassword is required")
    .isLength({ min: 8 })
    .withMessage("Too Short Password"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("confirmPassword is required")
    .isLength({ min: 8 })
    .withMessage("Too Short confirmPassword")
    .custom((value, { req }) => {
      if (req.body.newPassword !== value) {
        throw new Error("confirm new Password is falus");
      }
      return true;
    }),

  handelParamesError,
];

const ValiditeUpdit = [
  check("username")
    .isLength({ min: 3 })
    .withMessage("Too Short username")
    .isLength({ max: 50 })
    .withMessage("Too long username"),
  check("bio")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too Short bio")
    .isLength({ max: 100 })
    .withMessage("Too long bio"),
  handelParamesError,
];

const ValiditeLogin = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Forma not email"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Too Short Password"),
  handelParamesError,
];

module.exports = {
  ValiditUserId,
  ValiditeCreat,
  ValiditePassworUpdit,
  ValiditeUpdit,
  ValiditeLogin,
};
