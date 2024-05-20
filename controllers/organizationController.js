import Organization from "../models/organizationModel.js";
import asyncHandler from "express-async-handler";
import Protocol from "../models/protocolModel.js";
import SOP from "../models/sopModel.js";
import User from "../models/userModel.js";
import Sample from "../models/sampleModel.js";
import ChemicalDrawing from "../models/chemicalDrawingModel.js";
import Entry from "../models/EntryModel.js";
import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";

const addNewOrganization = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name && !description) {
    res.status(400);
    throw new Error("Please provide a name and description.");
    return;
  } else {
    const org = new Organization({
      user: req.user._id,
      name,
      description,
    });

    const createdOrg = await org.save();
    res.status(200);
    res.json(createdOrg);
  }
});

const getMyOrganizations = asyncHandler(async (req, res) => {
  const organs = await Organization.find({ user: req.user._id });
  res.json(organs);
});

const getCollabOrganizations = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const organs = await Organization.find({
    "collaborators.user": req.user._id,
  });
  res.json(organs);
});

const joinAnOrg = asyncHandler(async (req, res) => {
  const { orgId, collabDetails } = req.body;
  const userOrg = await Organization.find({
    user: collabDetails.user,
  });
  const userOrgCollab = await Organization.find({
    "collaborators.user": collabDetails.user,
  });
  console.log(userOrg);
  console.log(userOrgCollab);
  if (userOrg.length === 0 && userOrgCollab.length === 0) {
    const project = await Organization.findById(orgId);
    if (project) {
      let collabs = project.collaborators;
      const found = collabs.some((el) => el.user == collabDetails.user);
      if (found) {
        res.status(401);
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
  } else {
    throw new Error("User already exists in another organization");
  }
});

const getMyDataOrganizations = asyncHandler(async (req, res) => {
  const { orgId } = req.body;
  const orgDetails = await await Organization.findById(orgId);
  const ownerDetails = await User.findById(orgDetails.user).select("-password");
  let orgData = [];
  let ownerFinalData = [
    {
      user: ownerDetails._id,
      userName: ownerDetails.name,
    },
  ];

  let arrayToBeMapped = orgDetails.collaborators;
  let asyncFunction = async (id, name) => {
    const protocols = await Protocol.find({ user: id });
    const sops = await SOP.find({ user: id });
    const samples = await Sample.find({ user: id });
    const tasks = await Task.find({ user: id });
    const cd = await ChemicalDrawing.find({ user: id });
    const projects = await Project.find({ user: id });
    await orgData.push({
      user: id,
      name: name,
      protocols,
      sops,
      samples,
      tasks,
      cd,
      projects,
    });
  };

  console.log(arrayToBeMapped);
  const promises = arrayToBeMapped
    .concat(ownerFinalData)
    .map((e) => asyncFunction(e.user, e.userName));
  await Promise.all(promises);
  res.json({
    orgData,
  });
});

const addCollabratorOrg = asyncHandler(async (req, res) => {
  const { orgId, collabDetails } = req.body;
  const userOrg = await Organization.find({
    user: collabDetails.user,
  });
  const userOrgCollab = await Organization.find({
    "collaborators.user": collabDetails.user,
  });
  console.log(userOrg);
  console.log(userOrgCollab);
  if (userOrg.length === 0 && userOrgCollab.length === 0) {
    const project = await Organization.findById(orgId);
    if (project) {
      let collabs = project.collaborators;
      const found = collabs.some((el) => el.user == collabDetails.user);
      if (found) {
        res.status(401);
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
  } else {
    throw new Error("User already exists in another organization");
  }
});

//

const removeCollabratorOrg = asyncHandler(async (req, res) => {
  const { projectId, collabDetails } = req.body;
  const project = await Organization.findById(projectId);
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

const updateCollabStatusOrg = asyncHandler(async (req, res) => {
  const { projectId, id, status } = req.body;
  const project = await Organization.findById(projectId);
  if (project) {
    let collabs = project.collaborators;
    const objIndex = collabs.findIndex((el) => el.user == id);
    collabs[objIndex].userStatus = status;
    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error("No Project Found");
  }
});

const updateCollabRoleOrg = asyncHandler(async (req, res) => {
  const { role, projectId, id, permissions } = req.body;
  const project = await Organization.findById(projectId);
  if (project) {
    let collabs = project.collaborators;
    const objIndex = collabs.findIndex((el) => el.user == id);
    collabs[objIndex].userType = role;
    collabs[objIndex].permissions = permissions;
    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error("No Project Found");
  }
});

const addOrgLogs = asyncHandler(async (req, res) => {
  const { entryId, logDetails } = req.body;
  const entry = await Organization.findById(entryId);
  if (entry) {
    let newLogs = entry.logs;
    newLogs.push(logDetails);
    entry.logs = newLogs;
    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } else {
    throw new Error(" No org with id");
  }
});

const updateOrganizationProfile = asyncHandler(async (req, res) => {
  const project = await Organization.findById(req.params.id);
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

export {
  addNewOrganization,
  getMyOrganizations,
  getCollabOrganizations,
  removeCollabratorOrg,
  addCollabratorOrg,
  updateCollabRoleOrg,
  joinAnOrg,
  getMyDataOrganizations,
  updateCollabStatusOrg,
  addOrgLogs,
  updateOrganizationProfile,
};
