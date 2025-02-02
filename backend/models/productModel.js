const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    // productName: String,
    companyName: String,
    category: String,
    productImage: [],
    description: String,
    suggestion: String,
    AfterSubject: String,
    yearofexperience: Number,
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("review", reviewSchema);

module.exports = productModel;
