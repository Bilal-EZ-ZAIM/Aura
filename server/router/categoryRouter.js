const express = require("express");
const {
  addCategory,
  updateCategoryById,
  deleteCategoryById,
  getAllCategory,
} = require("../controller/categoryController");
const {
  ValiditeCreat,
  ValiditeUpdate,
} = require("../util/validateur/ValiditCategory");
const validateObjectId = require("../util/validateObjectId");
const router = express.router();

router.get("/getAll", getAllCategory);
router.post("/add", ValiditeCreat, addCategory);
router.put("/update/:id", validateObjectId, ValiditeUpdate, updateCategoryById);
router.delete("/delete/:id", validateObjectId, deleteCategoryById);

module.exports = router;
