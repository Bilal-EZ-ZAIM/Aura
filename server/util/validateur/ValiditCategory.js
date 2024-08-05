const { check } = require("express-validator");
const handelParamesError = require("../../middlewares/HandelParamesError");

const ValiditeCreat = [
  check("titel")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too Short category")
    .isLength({ max: 1000 })
    .withMessage("Too long category")
    .isString()
    .custom(async (value) => {
      console.log(value);
    }),
  check("discription")
    .optional()
    .isLength({ min: 20 })
    .withMessage("Too Short discription")
    .isLength({ max: 250 })
    .isString()
    .withMessage("Too long discription"),
  handelParamesError,
];

const ValiditeUpdate = [
  check("titel")
    .optional()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too Short category")
    .isLength({ max: 1000 })
    .withMessage("Too long category")
    .custom(async (value) => {
      console.log(value);
    }),
  check("discription")
    .optional()
    .isLength({ min: 20 })
    .withMessage("Too Short discription")
    .isLength({ max: 250 })
    .withMessage("Too long discription"),
  handelParamesError,
];

module.exports = { ValiditeCreat, ValiditeUpdate };
