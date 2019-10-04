const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: String,
  description: String,
  photos: [],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
});

module.exports = mongoose.model("Project", projectSchema);
