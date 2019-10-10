const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
  source: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Photo", photoSchema);
