const ApiError = require("../util/ApiError");

const verifyAdmin = async (req, res, next) => {
  try {
    const user = req.user; 

    if (user.role !== "ADMIN") {
      return next(
        new ApiError(
          "You do not have the necessary permissions to access this route",
          403
        )
      );
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = verifyAdmin;
