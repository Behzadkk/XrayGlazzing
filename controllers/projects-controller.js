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
  const newProject = req.body.project;
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

exports.editAProject = (req, res) => {
  const editingProject = req.body.project;
  const id = req.params.id;
  Project.findOneAndUpdate(id, editingProject, function(err, updatedProject) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        updatedProject: updatedProject
      });
    }
  });
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
