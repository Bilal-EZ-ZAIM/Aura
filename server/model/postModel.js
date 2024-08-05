const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      minlength: 2,
      maxlength: 100,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
