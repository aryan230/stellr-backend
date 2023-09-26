import asyncHandler from "express-async-handler";
import Report from "../models/reportModel.js";
import Dashboard from "../models/dashboardModel.js";

const addNewDashboard = asyncHandler(async (req, res) => {
  const { name, description, dataSet } = req.body;

  if (!name && !description) {
    res.status(400);
    throw new Error("Please provide a name and description.");
    return;
  } else {
    const report = new Dashboard({
      user: req.user._id,
      name,
      dataSet,
      description,
    });

    const createdReport = await report.save();
    res.status(200);
    res.json(createdReport);
  }
});

const getMyDashboards = asyncHandler(async (req, res) => {
  const reports = await Dashboard.find({ user: req.user._id });
  res.json(reports);
});

const updateDashboardProfile = asyncHandler(async (req, res) => {
  const project = await Dashboard.findById(req.params.id);
  if (project) {
    (project.name = req.body.name || project.name),
      (project.description = req.body.description || project.description),
      (project.active = req.body.active || project.active),
      (project.dataSet = req.body.dataSet || project.dataSet);
    const updatedProject = await project.save();
    res.json({
      _id: updatedProject._id,
      name: updatedProject.name,
      description: updatedProject.description,
      active: updatedProject.active,
    });
  } else {
    res.status(404);
    throw new Error("No Project Found");
  }
});

export { addNewDashboard, getMyDashboards, updateDashboardProfile };
