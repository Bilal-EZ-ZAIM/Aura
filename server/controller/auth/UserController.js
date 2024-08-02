const UserModel = require("../../model/UserModel");
const ApiError = require("../../util/ApiError");

/**
 *
 * @description Get all User
 * @router /api/user
 * @method GET
 * @access private only(admin)
 */

const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");

    if (!users) {
      throw "Not Users ";
    }

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @description Get one User
 * @router /api/user/:id
 * @method GET
 * @access public
 */

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");

    if (!user) {
      throw "Not User ";
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @description updit information user
 * @router /api/user/updit
 * @method POST
 * @access private
 */

const upditUser = async (req, res, next) => {
  try {
    const { username, bio } = req.body;

    const userUpdit = await UserModel.findById(req.user.id).select("-password");

    if (!userUpdit) {
      return next(new ApiError(`user  not fond `, 404));
    }

    userUpdit.username = username;
    userUpdit.bio = bio;
    userUpdit.save();

    return res.status(200).json({ userUpdit });
  } catch (error) {
    return res.status(404).json({ "err ": error });
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const deletUser = await UserModel.findByIdAndDelete({ _id: req.user.id });

    if (!deletUser) {
      return next(new ApiError(`user  not fond `, 404));
    }

    return res.status(203).json({
      message: "Deleted User with Sucssy ",
    });
  } catch (error) {
    return res.status(404).json({ "err ": error });
  }
};

module.exports = {
  upditUser,
  deleteUserById,
  getAllUser,
  getUser,
};
