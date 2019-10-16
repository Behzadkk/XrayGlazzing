const mongoose = require("mongoose");
const Drawing = require("../models/drawing");
const Product = require("../models/product");

// Show all drawings// Index
exports.getAllDrawings = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("drawings")
      .exec();
    const drawings = await products.filter(p => p.drawings.length > 0);
    res.status(200).json({
      drawings: drawings
    });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadADrawing = async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  try {
    const newDrawing = req.body;
    if (newDrawing.category === "") {
      newDrawing.category = null;
    }
    const createdDrawing = await Drawing.create(newDrawing);
    const updatingProduct = await Product.findById(createdDrawing.category);
    updatingProduct.drawings.push(createdDrawing._id);
    updatingProduct.save();
    res.status(200).json({
      createdDrawing: createdDrawing
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editADrawing = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const editingDrawing = req.body.drawing;
  const id = req.params.id;
  Drawing.findOneAndUpdate(id, editingDrawing, function(err, updatedDrawing) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        updatedDrawing: updatedDrawing
      });
    }
  });
};

exports.deleteADrawing = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  Drawing.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Drawing Deleted");
    }
  });
};
