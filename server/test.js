const { check, body } = require("express-validator");
const handleParamsError = require("../../middlewares/HandelParamesError");
const UserModel = require("../../model/UserModel");

// Validate user ID
const validateUserId = [
  check("id")
    .isMongoId()
    .withMessage("Invalid ID format. Please provide a valid MongoDB ID."),
  handleParamsError,
];

// Validate user registration
const validateCreate = [
  check("username")
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3 })
    .withMessage(
      "Username is too short. It must be at least 3 characters long."
    )
    .isLength({ max: 50 })
    .withMessage("Username is too long. It must be less than 50 characters."),

  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format. Please provide a valid email address.")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        return Promise.reject(new Error("Email is already in use."));
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage(
      "Password is too short. It must be at least 8 characters long."
    ),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required.")
    .isLength({ min: 8 })
    .withMessage(
      "Confirm password is too short. It must be at least 8 characters long."
    )
    .custom((value, { req }) => {
      if (req.body.password !== value) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),

  check("bio")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Bio is too short. It must be at least 3 characters long.")
    .isLength({ max: 100 })
    .withMessage("Bio is too long. It must be less than 100 characters."),

  handleParamsError,
];

const validateImage = [
  check("imgProfile")
    .notEmpty()
    .withMessage("imgProfile is required.")
    .isString()
    .withMessage("Image profile URL should be a string.")
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image file is required.");
      }
      return true;
    })
    .custom((value, { req }) => {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(req.file.mimetype)) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, and GIF are allowed."
        );
      }
      if (req.file.size > 3 * 1024 * 1024) {
        throw new Error("File size exceeds 3MB.");
      }
      return true;
    }),
  handleParamsError,
];

// Validate password update
const validatePasswordUpdate = [
  check("password")
    .notEmpty()
    .withMessage("Current password is required.")
    .isLength({ min: 8 })
    .withMessage(
      "Current password is too short. It must be at least 8 characters long."
    ),

  check("newPassword")
    .notEmpty()
    .withMessage("New password is required.")
    .isLength({ min: 8 })
    .withMessage(
      "New password is too short. It must be at least 8 characters long."
    ),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm new password is required.")
    .isLength({ min: 8 })
    .withMessage(
      "Confirm new password is too short. It must be at least 8 characters long."
    )
    .custom((value, { req }) => {
      if (req.body.newPassword !== value) {
        throw new Error("New passwords do not match.");
      }
      return true;
    }),

  handleParamsError,
];

// Validate user update
const validateUpdate = [
  check("username")
    .isLength({ min: 3 })
    .withMessage(
      "Username is too short. It must be at least 3 characters long."
    )
    .isLength({ max: 50 })
    .withMessage("Username is too long. It must be less than 50 characters."),

  check("bio")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Bio is too short. It must be at least 3 characters long.")
    .isLength({ max: 100 })
    .withMessage("Bio is too long. It must be less than 100 characters."),

  handleParamsError,
];

// Validate login
const validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format. Please provide a valid email address."),

  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage(
      "Password is too short. It must be at least 8 characters long."
    ),

  handleParamsError,
];

module.exports = {
  validateImage,
  validateUserId,
  validateCreate,
  validatePasswordUpdate,
  validateUpdate,
  validateLogin,
};
