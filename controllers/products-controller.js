const mongoose = require("mongoose");
const Product = require("../models/product");
const Photo = require("../models/photo");
const Project = require("../models/project");

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

exports.getACategory = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const products = await Product.find({ group: category });
    res.status(200).json({
      products: products
    });
  } catch (error) {
    console.log(error);
  }
};

// Show all products in a sub category
exports.getAProduct = async (req, res) => {
  try {
    let products = [];
    const productType = req.params.productType;
    const foundProduct = await Product.findOne({ subCat: productType });
    products.push(foundProduct);
    if (foundProduct) {
      const photos = await Photo.find({ category: foundProduct._id });
      products.push({ photos });
      res.status(200).json({
        products: products
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.createAProduct = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const newProduct = req.body;
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

exports.editAProduct = async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  try {
    const editingProduct = req.body;
    const productType = req.params.productType;
    const updatedProduct = await Product.findOneAndUpdate(
      { subCat: productType },
      editingProduct
    );
    updatedProduct.banner = editingProduct.banner;
    updatedProduct.save();
    res.status(200).json({
      updatedProduct: updatedProduct
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAProduct = async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  try {
    const id = req.body.id;
    const product = await Product.findById(id);
    if (product.projects) {
      const editingProjects = await Project.find({
        _id: { $in: product.projects }
      });
      editingProjects.map(p => {
        let index = p.products.indexOf(id);
        p.products.splice(index, 1);
      });
    }
    product.remove();
    res.send("Product Deleted");
  } catch (error) {
    console.log(error);
  }
};
