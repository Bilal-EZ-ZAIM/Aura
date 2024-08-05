const mongose = require("mongoose");
const CategorySchema = new mongose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, " is required"],
      minlength: 2,
      maxlength: 100,
    },
    discription: {
      type: String,
      trim: true,
      minlength: 20,
      maxlength: 250,
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongose.model("Category", CategorySchema);

module.exports = CategoryModel;
