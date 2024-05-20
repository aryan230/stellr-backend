import asyncHandler from "express-async-handler";
import Sample from "../models/sampleModel.js";
import Protocol from "../models/protocolModel.js";
import SOP from "../models/sopModel.js";

const addSop = asyncHandler(async (req, res) => {
  const { title, data, image, file } = req.body;
  const protocols = await SOP.find({ user: req.user._id });
  const protocol = await SOP.create({
    user: req.user._id,
    title,
    image: image && image,
    file: file && file,
    data,
    sopId: protocols.length + 1,
  });
  if (protocol) {
    res.status(201);
    res.json({
      _id: protocol._id,
      title: protocol.title,
    });
  } else {
    res.status();
    throw new Error("Invalid Data");
  }
});

const getAllSops = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const sample = await Protocol.find({});
  res.json(sample);
});

const getMySops = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const sample = await SOP.find({ user: req.user._id });
  res.json(sample);
});

const updateSopProfile = asyncHandler(async (req, res) => {
  const project = await SOP.findById(req.params.id);
  if (project) {
    project.share = req.body.share || project.share;
    const updatedProject = await project.save();
    res.json({
      _id: updatedProject._id,
      data: updatedProject.data,
      share: updatedProject.share,
    });
  } else {
    res.status(404);
    throw new Error("No Sample Found");
  }
});

const addSOPLogs = asyncHandler(async (req, res) => {
  const { entryId, logDetails } = req.body;
  const entry = await SOP.findById(entryId);
  if (entry) {
    let newLogs = entry.logs;
    newLogs.push(logDetails);
    entry.logs = newLogs;
    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } else {
    throw new Error(" No task with id");
  }
});

const updateSopStatus = asyncHandler(async (req, res) => {
  const project = await SOP.findById(req.params.id);
  if (project) {
    project.status = req.body.status || project.status;
    project.statusBy = req.body.userName;
    project.statusMessage = req.body.statusMessage;
    const updatedProject = await project.save();
    res.json({
      _id: updatedProject._id,
      data: updatedProject.data,
    });
  } else {
    res.status(404);
    throw new Error("No Sample Found");
  }
});

const getSopById = asyncHandler(async (req, res) => {
  const sample = await SOP.findById(req.params.id);
  res.json(sample);
});

const deleteSOP = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const template = await SOP.findById(id);
  template.deleted = true;
  const newTemplate = template.save();
  res.json(newTemplate);
});
const restoreSOP = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const template = await SOP.findById(id);
  template.deleted = false;
  const newTemplate = template.save();
  res.json(newTemplate);
});

export {
  addSop,
  getMySops,
  getAllSops,
  updateSopProfile,
  addSOPLogs,
  updateSopStatus,
  getSopById,
  deleteSOP,
  restoreSOP,
};
