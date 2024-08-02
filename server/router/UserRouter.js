const express = require("express");

const router = express.Router();

const {
  upditUser,
  deleteUserById,
  getAllUser,
  getUser,
} = require("../controller/auth/UserController");

const {
  ValiditeUpdit,
} = require("../util/validateur/ValiditUser");

const verifyToken = require("../middlewares/VerifyToken");
const virefiyAdmin = require("../middlewares/VerifyAdmin");
const validateObjectId = require("../util/validateObjectId");
// const verifyTokenUser = require('../middlewares/verifyTokenUser');


// router.get("/", verifyToken, virefiyAdmin, getAllUser);

router.get("/", getAllUser);
router.get("/:id", validateObjectId ,getUser);

router.put("/updit", verifyToken, ValiditeUpdit, upditUser);


module.exports = router;
