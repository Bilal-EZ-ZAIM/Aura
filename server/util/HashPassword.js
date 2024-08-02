const bcrypt = require("bcrypt");

const HashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassw = await bcrypt.hash(password, salt);
    console.log("Hashed password: " + hashpassw);
    return hashpassw;
  } catch (error) {
    console.error("Error hashing password: ", error);
    throw new Error("Error hashing password");
  }
};

module.exports = HashPassword;
