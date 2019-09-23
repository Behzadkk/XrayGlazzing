const mongoose = require("mongoose");

const drawingSchema = mongoose.Schema({
  source: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }
});

module.exports = mongoose.model("Drawing", drawingSchema);
