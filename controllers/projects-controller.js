const mongoose = require("mongoose");
const Project = require("../models/project");
const Product = require("../models/product");

exports.getAllProjects = (req, res) => {
  Project.find({}, function(err, projects) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        projects: projects
      });
    }
  });
};

exports.getProjects = async (req, res) => {
  try {
    const productType = req.params.productType;
    const product = await Product.findOne({ subCat: productType })
      .populate("projects")
      .exec();
    res.status(200).json({
      projects: product.projects
    });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadAProject = async (req, res) => {
  try {
    const newProject = req.body;
    const createdProject = await Project.create(newProject);
    editingProduct.projects.push(createdProject._id);
    res.status(200).json({
      createdProject: createdProject
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editAProject = async (req, res) => {
  try {
    const editingProject = req.body;
    const id = req.params.id;
    const updatedProject = await Project.findByIdAndUpdate(id, editingProject);
    updatedProject.save();
    if (updatedProject.products[0]) {
      const editingProduct = await Product.findById(updatedProject.products[0]);
      editingProduct.projects.push(updatedProject._id);
      editingProduct.save();
    }

    res.status(200).json({
      updatedProject: updatedProject
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAProject = (req, res) => {
  Project.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Project Deleted");
    }
  });
};
