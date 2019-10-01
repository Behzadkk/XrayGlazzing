const mongoose = require("mongoose");
const Product = require("../models/product");

// Show all products// Index
exports.getAllProduct = (req, res) => {
  Product.find({}, function(err, products) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        products: products
      });
    }
  });
};

// Show all products in a sub category
exports.getAProduct = (req, res) => {
  const productType = req.params.productType;
  Product.find({ subCat: productType }, function(err, products) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        products: products
      });
    }
  });
};

exports.createAProduct = (req, res) => {
  const newProduct = req.body;
  console.log(req.body);
  Product.create(newProduct, function(err, createdProduct) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        createdProduct: createdProduct
      });
    }
  });
};

exports.editAProduct = (req, res) => {
  const editingProduct = req.body.product;
  const productType = req.params.productType;
  Product.findOneAndUpdate(productType, editingProduct, function(
    err,
    updatedProduct
  ) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        updatedProduct: updatedProduct
      });
    }
  });
};

exports.deleteAProduct = (req, res) => {
  const productType = req.params.productType;
  Product.findOneAndDelete(productType, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Product Deleted");
    }
  });
};
