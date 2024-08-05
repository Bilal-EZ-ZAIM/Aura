const cloud = require("../util/cloudnary");
const UserModel = require("../model/UserModel");

const uplodSingleImage = async (req, res) => {
  try {
    // Send the file to Cloudinary
    const cloudinaryResult = await cloud(req.file.path);
    const userUpditImage = await UserModel.findById(req.user.id).select(
      "-password"
    );

    if (!userUpditImage) {
      return next(new ApiError(`user  not fond `, 404));
    }

    console.log(userUpditImage);
    
    userUpditImage.imgProfile.url = cloudinaryResult.url;
    res.status(200).json({
      message: "Image uploaded successfully",
      user: userUpditImage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uplodSingleImage,
};
