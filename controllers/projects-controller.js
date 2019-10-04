const mongoose = require("mongoose");
const Project = require("../models/project");

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

exports.uploadAProject = (req, res) => {
  const newProject = req.body;
  Project.create(newProject, function(err, createdProject) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        createdProject: createdProject
      });
    }
  });
};

exports.editAProject = async (req, res) => {
  try {
    const editingProject = req.body;
    const id = req.params.id;
    const updatedProject = await Project.findByIdAndUpdate(id, editingProject);
    console.log(updatedProject);
    updatedProject.save();
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
