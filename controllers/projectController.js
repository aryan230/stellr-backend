import Delivery from "../models/deliveryAdressModel.js";
import Project from "../models/projectModel.js";
import asyncHandler from "express-async-handler";

const addNewProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name && !description) {
    res.status(400);
    throw new Error("Please provide a name and description.");
    return;
  } else {
    const project = new Project({
      user: req.user._id,
      name,
      description,
    });

    const createdProject = await project.save();
    res.status(200);
    res.json(createdProject);
  }
});

const getProjectsById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error("Project not Found");
  }
});

const getMyProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
});

export { getProjectsById, addNewProject, getMyProjects };
