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
const router = express.router();

router.get("/getAll", getAllCategory);
router.post("/add", ValiditeCreat, addCategory);
router.put("/update/:id", ValiditeUpdate, updateCategoryById);
router.delete("/delete/:id", deleteCategoryById);

module.exports = router;
