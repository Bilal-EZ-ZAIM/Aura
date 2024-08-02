const { check } = require("express-validator");
const handelParamesError = require("../../middlewares/HandelParamesError");
const SubCategoryModel = require("../../model/SubCategoeyModel");

const validateProductId = [
  check("id").isMongoId().withMessage("Invalid Product ID"),
  handelParamesError,
];

const validateCreateProduct = [
  check("name")
    .notEmpty()
    .withMessage("Product name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Product name is too short")
    .isLength({ max: 200 })
    .withMessage("Product name is too long")
    .isString()
    .withMessage("Product name must be a string"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .trim()
    .isLength({ min: 25 })
    .withMessage("Product description is too short")
    .isLength({ max: 355 })
    .withMessage("Product description is too long")
    .isString()
    .withMessage("Product description must be a string"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ min: 0 })
    .withMessage("Product price must be a positive number"),
  check("discount")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Product discount must be a positive number"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isInt({ min: 1 })
    .withMessage("Product quantity must be at least 1"),
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid Category ID"),
  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid subCategory ID"),
  check("brand").optional().isMongoId().withMessage("Invalid Brand ID"),
  check("ratingsAverage")
    .optional()
    .isNumeric({ min: 1 })
    .withMessage("Product Ratings Average must be a positive number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be above or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric({ min: 0 })
    .withMessage("ratings Quantity is number"),
  check("sold")
    .optional()
    .isNumeric({ min: 0 })
    .withMessage("sold a positive number"),
  check("color")
    .optional()
    .isArray()
    .withMessage("Avilabels Colors shold be array of string"),
  check("image")
    .optional()
    .isArray()
    .withMessage("Avilabels Colors shold be array of string"),
  check("imageCover")
    .notEmpty()
    .withMessage("image Cover is required")
    .isString(),
  handelParamesError,
];

const validateUpditProduct = [
  check("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Product name is too short")
    .isLength({ max: 200 })
    .withMessage("Product name is too long")
    .isString()
    .withMessage("Product name must be a string"),
  check("description")
    .trim()
    .isLength({ min: 25 })
    .withMessage("Product description is too short")
    .isLength({ max: 355 })
    .withMessage("Product description is too long")
    .isString()
    .withMessage("Product description must be a string"),
  check("price")
    .isFloat({ min: 0 })
    .withMessage("Product price must be a positive number"),
  check("discount")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Product discount must be a positive number"),
  check("quantity")
    .isInt({ min: 1 })
    .withMessage("Product quantity must be at least 1"),
  check("category").isMongoId().withMessage("Invalid subCategory ID"),
  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid subCategory ID"),
  check("brand").optional().isMongoId().withMessage("Invalid Brand ID"),
  check("ratingsAverage")
    .optional()
    .isNumeric({ min: 1 })
    .withMessage("Product Ratings Average must be a positive number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be above or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric({ min: 0 })
    .withMessage("ratings Quantity is number"),
  check("sold")
    .optional()
    .isNumeric({ min: 0 })
    .withMessage("sold a positive number"),
  check("color")
    .optional()
    .isArray()
    .withMessage("Avilabels Colors shold be array of string"),
  check("image")
    .optional()
    .isArray()
    .withMessage("Avilabels Colors shold be array of string"),
  check("imageCover")
    .notEmpty()
    .withMessage("image Cover is required")
    .isString(),
  handelParamesError,
];

module.exports = {
  validateProductId,
  validateCreateProduct,
  validateUpditProduct,
};
