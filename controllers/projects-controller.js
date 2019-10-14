const mongoose = require("mongoose");
const Project = require("../models/project");
const Product = require("../models/product");
const Photo = require("../models/photo");

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

exports.showAProject = (req, res) => {
  let projects = [];
  Project.findById(req.params.id, function(err, foundProject) {
    if (err) {
      console.log(err);
    }
    projects.push(foundProject);
    Photo.find({ project: foundProject._id }, function(err, photos) {
      if (err) {
        console.log(err);
      } else {
        projects.push({ photos });
        res.status(200).json({
          projects: projects
        });
      }
    });
  });
};

exports.uploadAProject = async (req, res) => {
  try {
    const newProject = req.body;
    const createdProject = await Project.create(newProject);
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
    updatedProject.products = editingProject.products;
    updatedProject.save();
    if (updatedProject.products) {
      const editingProducts = await Product.find({
        _id: { $in: updatedProject.products }
      });
      editingProducts.map(p => {
        const including = p.projects.includes(updatedProject._id);
        if (!including) {
          p.projects.push(updatedProject._id);
          p.save();
        }
      });
    }
    res.status(200).json({
      updatedProject: updatedProject
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (project.products) {
      const editingProducts = await Product.find({
        _id: { $in: project.products }
      });
      editingProducts.map(p => {
        let index = p.projects.indexOf(id);
        p.projects.splice(index, 1);
      });
    }
    project.remove();
    res.send("Project Deleted");
  } catch (error) {
    console.log(error);
  }
};
