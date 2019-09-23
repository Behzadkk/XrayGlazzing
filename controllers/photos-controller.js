const mongoose = require("mongoose");
const Photo = require("../models/photo");

// Show all photos// Index
// We dont need it yet
exports.getAllPhotos = (req, res) => {
  Photo.find({}, function(err, photos) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        photos: photos
      });
    }
  });
};

// Show all photos in a sub category
exports.getPhotos = (req, res) => {
  const productType = req.params.productType;
  Photo.find({ category: productType }, function(err, photos) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        photos: photos
      });
    }
  });
};

exports.uploadAPhoto = (req, res) => {
  const newPhoto = req.body.photo;
  Photo.create(newPhoto, function(err, createdPhoto) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        createdPhoto: createdPhoto
      });
    }
  });
};

exports.editAPhoto = (req, res) => {
  const editingPhoto = req.body.photo;
  const id = req.params.id;
  Photo.findOneAndUpdate(id, editingPhoto, function(err, updatedPhoto) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        updatedPhoto: updatedPhoto
      });
    }
  });
};

exports.deleteAPhoto = (req, res) => {
  Photo.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Photo Deleted");
    }
  });
};
