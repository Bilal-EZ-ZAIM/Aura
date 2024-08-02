const { check } = require("express-validator");
const handelParamesError = require("../../middlewares/HandelParamesError");
const ValiditCategory = [
  check("id").isMongoId().withMessage("Id is not fond"),
  handelParamesError,
];

const ValiditeCreat = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too Short category")
    .isLength({ max: 32 })
    .withMessage("Too long category"),
  handelParamesError,
];

module.exports = { ValiditCategory, ValiditeCreat };
