import OrganizationRoles from "../models/OrganizationRolesModel.js";
import asyncHandler from "express-async-handler";

const addNewOrgRole = asyncHandler(async (req, res) => {
  const { name, orgId, permissions } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please provide a name.");
    return;
  } else {
    const project = new OrganizationRoles({
      user: req.user._id,
      organization: orgId,
      name,
      permissions,
    });

    const createdProject = await project.save();
    res.status(200);
    res.json(createdProject);
  }
});

const getMyOrgRoles = asyncHandler(async (req, res) => {
  const projects = await OrganizationRoles.find({
    organization: req.params.id,
  });
  res.json(projects);
});

export { addNewOrgRole, getMyOrgRoles };
