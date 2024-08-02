const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const URL = process.env.URL;

const dbConection = () =>
  mongoose
    .connect(URL)
    .then(() => {
      console.log("mongodb is connect");
    })

module.exports = dbConection;