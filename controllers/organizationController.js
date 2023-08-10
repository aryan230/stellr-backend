import Organization from "../models/organizationModel.js";
import asyncHandler from "express-async-handler";

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

const updateCollabRoleOrg = asyncHandler(async (req, res) => {
  const { role, projectId, id } = req.body;
  const project = await Organization.findById(projectId);
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

export {
  addNewOrganization,
  getMyOrganizations,
  getCollabOrganizations,
  removeCollabratorOrg,
  addCollabratorOrg,
  updateCollabRoleOrg,
  joinAnOrg,
};
