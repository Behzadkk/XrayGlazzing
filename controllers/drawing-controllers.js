const mongoose = require("mongoose");
const Drawing = require("../models/drawing");

// Show all drawings// Index
exports.getAllDrawings = async (req, res) => {
  try {
    const drawings = await Drawing.find({})
      .populate("category")
      .exec();
    res.status(200).json({
      drawings: drawings
    });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadADrawing = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const newDrawing = req.body;
  Drawing.create(newDrawing, function(err, createdDrawing) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        createdDrawing: createdDrawing
      });
    }
  });
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
