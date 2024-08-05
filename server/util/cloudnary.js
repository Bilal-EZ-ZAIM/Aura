const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

const cloud = async (filePath) => {
  cloudinary.config({
    cloud_name: "dsldmzxqt",
    api_key: "911915962845283",
    api_secret: "WxofRCHYbkEQhRultpf_vNyp5DE", // Replace with your actual API secret
    secure: true,
  });

  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(filePath);

    // Remove the file after uploading to Cloudinary
    fs.unlinkSync(filePath);

    console.log("Upload Result:", uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });

    console.log("Optimized URL:", optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(uploadResult.public_id, {
      crop: "fill",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    console.log("Auto-cropped URL:", autoCropUrl);

    return uploadResult; // Return the result for use in the route
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the route
  }
};

module.exports = cloud;