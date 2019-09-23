const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  group: {
    type: String,
    required: "must be one of the main categories"
  },
  subCat: String,
  description: String,
  mainPhotos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo"
    }
  ],
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
