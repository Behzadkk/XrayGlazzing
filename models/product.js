const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  group: {
    type: String,
    required: "must be one of the main categories"
  },
  subCat: String,
  name: String,
  description: String,
  keyFeatures: String,
  moreInfo: String,
  subHeading: String,
  moreDetails: String,
  mainPhotos: [],
  drawings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drawing"
    }
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  ]
});

module.exports = mongoose.model("Product", productSchema);
