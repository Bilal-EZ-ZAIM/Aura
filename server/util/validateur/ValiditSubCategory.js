const { check } = require("express-validator");
const handelParamesError = require("../../middlewares/HandelParamesError");
const ValiditSubCategory = [
  check("id").isMongoId().withMessage("Id is not fond"),
  handelParamesError,
];

const ValiditeCreatSub = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 3 })
    .withMessage("Too Short SubCategory")
    .isLength({ max: 32 })
    .withMessage("Too long SubCategory"),
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),
  handelParamesError,
];

module.exports = { ValiditSubCategory, ValiditeCreatSub };
