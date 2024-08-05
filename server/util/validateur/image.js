const handelParamesError = require("../../middlewares/HandelParamesError");
const { check, validationResult } = require("express-validator");
const { upload } = require("../prepareImage/prepareImage");

const validateImage = [
  // Middleware to handle single file upload with field name 'image'
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        // Logging the error for debugging
        console.error("Multer error:", err);
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  // Custom validation for image
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if file is present
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({
          error: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
        });
    }

    // Validate file size
    if (req.file.size > 3 * 1024 * 1024) {
      // 3MB
      return res.status(400).json({ error: "File size exceeds 3MB." });
    }

    next();
  },
  handelParamesError,
];

module.exports = validateImage;
