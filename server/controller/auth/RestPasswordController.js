const UserModel = require("../../model/UserModel");
const ApiError = require("../../util/ApiError");
const bcrypt = require("bcrypt");
const CreateToken = require("../../util/CreateToken");
const envoyerEmail = require("../../util/Mail");

const getViewRestPassword = async (req, res) => {
  try {
    await res.render("forgat-password");
  } catch (error) {
    console.error("Error rendering forgat-password:", error);
    res.status(500).send("An error occurred while trying to display the page.");
  }
};

const getViewUpditPassword = async (req, res) => {
  try {
    return await res.render("updite-password");
  } catch (error) {
    console.error("Error rendering forgat-password:", error);
    res.status(500).send("An error occurred while trying to display the page.");
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    // console.log(req.body);
    const user = await UserModel.findOne({ email: req.body.email });

    console.log(user);

    if (!user) {
      return next(new ApiError("User Not Fond", 403));
    }

    const token = CreateToken(user._id, "10m");

    const url = `http://localhost:4000/auth/upditPassword/${token}`;

    envoyerEmail("bilalzaim499@gmail.com", url).catch(console.error);

    // return res.status(200).json({
    //   user,
    //   token,
    // });
  } catch (error) {
    console.error("Error rendering forgat-password:", error);
    res.status(500).send("An error occurred while trying to display the page.");
  }
};

const upditPassword = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await req.user;

    console.log(user);

    if (!user) {
      return next(new ApiError("User Not Fond", 403));
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt).then();

    return await res.render("message");
  } catch (error) {
    console.error("Error rendering forgat-password:", error);
    res.status(500).send("An error occurred while trying to display the page.");
  }
};
module.exports = {
  getViewRestPassword,
  getUserByEmail,
  upditPassword,
  getViewUpditPassword
};
