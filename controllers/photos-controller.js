const mongoose = require("mongoose");
const Photo = require("../models/photo");
const Product = require("../models/product");

// Show all photos// Index
exports.getAllPhotos = (req, res) => {
  Photo.find({})
    .populate("category")
    .exec(function(err, photos) {
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
  Product.findOne({ subCat: productType }, function(err, product) {
    if (err) {
      console.log(err);
    } else {
      Photo.find({ category: product._id }, function(err, photos) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            photos: photos
          });
        }
      });
    }
  });
};

exports.uploadPhotos = (req, res) => {
  const newPhotos = req.body;
  Photo.insertMany(newPhotos, function(err, createdPhoto) {
    if (err) {
      console.log(err);
    } else {
      console.log(newPhotos);
      console.log(createdPhoto);
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
