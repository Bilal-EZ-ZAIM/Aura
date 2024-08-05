const express = require("express");
const router = express.Router();
const { uplodSingleImage } = require("../controller/uploadImageController");
const validateImage = require("../util/validateur/image");
const  upload  = require("../util/prepareImage/prepareImage");
const verifyTokens = require("../middlewares/VerifyToken");

router.post("/upload", verifyTokens, upload.single("image"), uplodSingleImage);

// مسار لتحميل عدة صور
router.post("/uploads", upload.array("images"), async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ error: "يرجى تحميل ملفات الصور" });
  }

  try {
    const uploadPromises = req.files.map((file) => cloud(file.path));
    const cloudinaryResults = await Promise.all(uploadPromises);

    res.status(200).json({
      message: "تم تحميل الملفات بنجاح",
      files: req.files,
      cloudinaryResults, // نتائج تحميل Cloudinary
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
