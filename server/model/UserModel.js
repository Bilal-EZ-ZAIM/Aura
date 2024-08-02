const mongose = require("mongoose");
const UserSchema = new mongose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "username is required"],
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email required"],
      unique: true,
    },
    imgProfile: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password required"],
      minlength: 8,
    },
    passwordChangedAt: Date,
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    bio: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongose.model("User", UserSchema);

module.exports = UserModel;
