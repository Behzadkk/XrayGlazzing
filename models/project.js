const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  description: String,
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo"
    }
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
});

module.exports = mongoose.model("Project", projectSchema);
