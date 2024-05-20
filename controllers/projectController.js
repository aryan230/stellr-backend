import Delivery from "../models/deliveryAdressModel.js";
import Project from "../models/projectModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Organization from "../models/organizationModel.js";
import Entry from "../models/EntryModel.js";
import Task from "../models/taskModel.js";
import { client } from "../server.js";
import TemplateOne from "../templates/one.js";

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

const updateProjectProfile = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    (project.name = req.body.name || project.name),
      (project.description = req.body.description || project.description);
    const updatedProject = await project.save();
    res.json({
      _id: updatedProject._id,
      name: updatedProject.name,
      description: updatedProject.description,
    });
  } else {
    res.status(404);
    throw new Error("No Project Found");
  }
});

const addCollabrator = asyncHandler(async (req, res) => {
  const { projectId, collabDetails, userEmail } = req.body;
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
      console.log(collabDetails);
      const messageData = {
        from: "no-reply <admin@getstellr.io>",
        to: userEmail,
        subject: `Welcome to Project ${project.name} on Stellr!`,
        html: `${TemplateOne(
          `You have been added to a new Project ${project.name}`,
          collabDetails.userName,
          `Congratulations! You have been added to a new project. As you dive into this project, your unique contributions will be greatly valued.`,
          `View Dashboard`,
          `https://app.getstellr.io/`,
          `© Stellr Tech Solutions Private Limited`
        )}`,
      };

      client.messages
        .create("getstellr.io", messageData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
      res.json(updatedProject);
    }
  } else {
    res.status(404);
    throw new Error("No Project Found");
  }
});

const addOrganization = asyncHandler(async (req, res) => {
  const { projectId, organizationId } = req.body;
  const project = await Project.findById(projectId);
  if (project) {
    let organizations = project.organizations;
    const found = organizations.some((el) => el.organization == organizationId);
    if (found) {
      throw new Error("Organization Already Exists in Project");
    } else {
      const org = await Organization.findById(organizationId);
      organizations.push({
        organization: organizationId,
        organizationName: org.name,
      });
      project.organizations = organizations;
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

const updateCollabRole = asyncHandler(async (req, res) => {
  const { role, projectId, id } = req.body;
  const project = await Project.findById(projectId);
  if (project) {
    let collabs = project.collaborators;
    const objIndex = collabs.findIndex((el) => el.user == id);
    collabs[objIndex].userType = role;
    const updatedProject = await project.save();
    res.json(updatedProject);
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

const getMyProjectstats = asyncHandler(async (req, res) => {
  const { projectId } = req.body;
  let stats = [];
  let asyncFunction = async (id, name) => {
    const entries = await Entry.find({ project: id });
    const tasks = await Task.find({ project: id });
    await stats.push({
      project: id,
      name: name,
      entries: entries.length,
      tasks: tasks.length,
    });
  };
  const promises = projectId.map((e) => asyncFunction(e._id, e.name));
  await Promise.all(promises);
  res.json({
    stats,
  });
});

const getMyProjectEntries = asyncHandler(async (req, res) => {
  const { projectId } = req.body;
  let stats = [];
  let asyncFunction = async (id, name) => {
    let entries = await Entry.find({ project: id });
    let tasks = await Task.find({ project: id });
    await stats.push({
      project: id,
      name: name,
      entries: entries,
      tasks: tasks.length,
    });
  };
  const promises = projectId.map((e) => asyncFunction(e._id, e.name));
  await Promise.all(promises);
  res.json({
    stats,
  });
});

const getCollabProjects = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const projects = await Project.find({
    "collaborators.user": req.user._id,
  });
  res.json(projects);
});

const getOrganizationProjects = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const org = await Organization.find({
    $or: [{ "collaborators.user": req.user._id }, { user: req.user._id }],
  });
  const projects = await Project.find({
    "organizations.organization": org[0]._id,
  });
  res.json(projects);
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
});

const addProjectLogs = asyncHandler(async (req, res) => {
  const { entryId, logDetails } = req.body;
  const entry = await Project.findById(entryId);
  if (entry) {
    let newLogs = entry.logs;
    newLogs.push(logDetails);
    entry.logs = newLogs;
    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } else {
    throw new Error(" No project with id");
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const template = await Project.findById(id);
  template.deleted = true;
  const newTemplate = template.save();
  res.json(newTemplate);
});

const restoreProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const template = await Project.findById(id);
  template.deleted = false;
  const newTemplate = template.save();
  res.json(newTemplate);
});

export {
  getProjectsById,
  addNewProject,
  getMyProjects,
  addCollabrator,
  getCollabProjects,
  getAllProjects,
  removeCollabrator,
  updateCollabRole,
  updateProjectProfile,
  addOrganization,
  getOrganizationProjects,
  addProjectLogs,
  getMyProjectstats,
  getMyProjectEntries,
  deleteProject,
  restoreProject,
};
