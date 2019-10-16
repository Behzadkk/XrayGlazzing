const mongoose = require("mongoose");

const drawingSchema = mongoose.Schema({
  source: String,
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }
});

module.exports = mongoose.model("Drawing", drawingSchema);
