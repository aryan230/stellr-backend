import asyncHandler from "express-async-handler";
import Sample from "../models/sampleModel.js";

const addSample = asyncHandler(async (req, res) => {
  const { type, data, assigned } = req.body;
  const samples = await Sample.find({ user: req.user._id });
  const sample = await Sample.create({
    user: req.user._id,
    type,
    data,
    sampleId: samples.length + 1,
  });
  if (sample) {
    res.status(201);
    res.json({
      _id: sample._id,
      type: sample.type,
      data: sample.data,
    });
  } else {
    res.status();
    throw new Error("Invalid Data");
  }
});

const getAllSamples = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const sample = await Sample.find({});
  res.json(sample);
});

const getMySamples = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const sample = await Sample.find({ user: req.user._id });
  res.json(sample);
});

const updateSampleProfile = asyncHandler(async (req, res) => {
  console.log(req.body);
  const project = await Sample.findById(req.params.id);
  if (project) {
    let vc = project.versionControl;
    vc.push({
      data: JSON.stringify(project),
      date: Date.now(),
    });
    project.versionControl = vc;
    project.data = req.body.data || project.data;
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

const addSampleLogs = asyncHandler(async (req, res) => {
  const { entryId, logDetails } = req.body;
  const entry = await Sample.findById(entryId);
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

const getSampleById = asyncHandler(async (req, res) => {
  const sample = await Sample.findById(req.params.id);
  res.json(sample);
});

const updateSampleShare = asyncHandler(async (req, res) => {
  const project = await Sample.findById(req.params.id);
  if (project) {
    project.share = req.body.share || project.share;
    const updatedProject = await project.save();
    res.json({
      _id: updatedProject._id,
      share: updatedProject.share,
    });
  } else {
    res.status(404);
    throw new Error("No Sample Found");
  }
});

export {
  addSample,
  getMySamples,
  getAllSamples,
  updateSampleProfile,
  addSampleLogs,
  getSampleById,
  updateSampleShare,
};
