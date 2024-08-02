const UserModel = require("../../model/UserModel");
const bcrypt = require("bcrypt");
const ApiError = require("../../util/ApiError");

const CreateToken = require("../../util/CreateToken");



/**
 *
 * @description Register New User
 * @router /api/auth/register
 * @method POST
 * @access public
 */

const SingUp = async (req, res) => {
  try {
    console.log(req.body);
    let user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(403)
        .json({ messages: "L'adresse e-mail est déjà enregistrée" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt).then();

    req.body.role = "USER";

    user = await UserModel.create(req.body);

    const token = CreateToken(user._id);

    return res.status(201).json({
      data: user,
      token,
      messages: "User Created with sucsfully",
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

/**
 *
 * @description Login New User
 * @router /api/auth/login
 * @method POST
 * @access public
 */

const Login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      const errr = new ApiError("Email Or Password not correct ", 404);
      return next(errr);
    }

    const verifyPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!verifyPassword) {
      const errr = new ApiError("Email Or Password not correct ", 404);
      return next(errr);
    }

    const token = CreateToken(user._id);

    return res.status(201).json({
      data: user,
      token,
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};



/**
 *
 * @description updit Password for user
 * @router /api/auth/upditPassword
 * @method POST
 * @access private
 */

const upditPassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;

    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return next(new ApiError("User not found", 404));
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return next(new ApiError("Password is not correct", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt).then();

    user.password = hashedPassword;
    user.passwordChangedAt = Date.now();
    await user.save();

    const token = CreateToken(user._id);

    return res
      .status(200)
      .json({ message: "Password updated successfully", token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  SingUp,
  Login,
  upditPassword,
};
