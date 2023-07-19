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

const addCollabrator = asyncHandler(async (req, res) => {
  const { projectId, collabDetails } = req.body;
  const project = await Project.findById(projectId);
  if (project) {
    let collabs = project.collaborators;
    const found = collabs.some((el) => el.user == collabDetails.user);
    if (found) {
      throw new Error("User Already Exists in Project");
    } else {
      collabs.push(collabDetails);
      project.collaborators = collabs;
      const updatedProject = await project.save();
      res.json(updatedProject);
    }
  } else {
    res.status(404);
    throw new Error("No Project Found");
  }
});

const removeCollabrator = asyncHandler(async (req, res) => {
  const { projectId, collabDetails } = req.body;
  const project = await Project.findById(projectId);
  if (project) {
    let collabs = project.collaborators;
    const found = collabs.filter((el) => el.user != collabDetails.user);
    if (found) {
      project.collaborators = found;
      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      throw new Error("Something went wrong");
    }
  } else {
    res.status(404);
    throw new Error("No Project Found");
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

const getCollabProjects = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const projects = await Project.find({
    "collaborators.user": req.user._id,
  });
  res.json(projects);
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
});

export {
  getProjectsById,
  addNewProject,
  getMyProjects,
  addCollabrator,
  getCollabProjects,
  getAllProjects,
  removeCollabrator,
};
