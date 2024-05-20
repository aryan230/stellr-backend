import asyncHandler from "express-async-handler";
import Sample from "../models/sampleModel.js";
import Protocol from "../models/protocolModel.js";

const addProtocol = asyncHandler(async (req, res) => {
  const { title, data, image, file } = req.body;
  const protocols = await Protocol.find({ user: req.user._id });
  const protocol = await Protocol.create({
    user: req.user._id,
    title,
    image: image && image,
    file: file && file,
    data,
    protocolId: protocols.length + 1,
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

const getAllProtocols = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const sample = await Protocol.find({});
  res.json(sample);
});

const getProtocolById = asyncHandler(async (req, res) => {
  const sample = await Protocol.findById(req.params.id);
  res.json(sample);
});

const getMyProtocols = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const sample = await Protocol.find({ user: req.user._id });
  res.json(sample);
});

const updateProtocolProfile = asyncHandler(async (req, res) => {
  const project = await Protocol.findById(req.params.id);
  if (project) {
    (project.data = req.body.data || project.data),
      (project.title = req.body.title || project.title),
      (project.image = req.body.image || project.image),
      (project.file = req.body.file || project.file),
      (project.share = req.body.share || project.share);
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

const addProtocolLogs = asyncHandler(async (req, res) => {
  const { entryId, logDetails } = req.body;
  const entry = await Protocol.findById(entryId);
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

const updateProtocolStatus = asyncHandler(async (req, res) => {
  const project = await Protocol.findById(req.params.id);
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

const deleteProtocol = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const template = await Protocol.findById(id);
  template.deleted = true;
  const newTemplate = template.save();
  res.json(newTemplate);
});

const restoreProtocol = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const template = await Protocol.findById(id);
  template.deleted = false;
  const newTemplate = template.save();
  res.json(newTemplate);
});

export {
  addProtocol,
  getMyProtocols,
  getAllProtocols,
  updateProtocolProfile,
  addProtocolLogs,
  updateProtocolStatus,
  getProtocolById,
  deleteProtocol,
  restoreProtocol,
};
