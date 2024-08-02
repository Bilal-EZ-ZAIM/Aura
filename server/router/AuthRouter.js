const express = require("express");

const router = express.Router();

const {
  SingUp,
  Login,
  upditPassword,
} = require("../controller/auth/AuthController");

const {
  ValiditeCreat,
  ValiditePassworUpdit,
  ValiditeLogin,
} = require("../util/validateur/ValiditUser");
const verifyToken = require("../middlewares/VerifyToken");

router.put("/upditPassword", verifyToken, ValiditePassworUpdit, upditPassword);
router.post("/register", ValiditeCreat, SingUp);
router.post("/login", ValiditeLogin, Login);

module.exports = router;
