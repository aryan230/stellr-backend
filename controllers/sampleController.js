import asyncHandler from "express-async-handler";
import Sample from "../models/sampleModel.js";

const addSample = asyncHandler(async (req, res) => {
  const { type, data, assigned } = req.body;
  const sample = await Sample.create({
    user: req.user._id,
    type,
    data,
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
  const sample = await Sample.find({ user: projectId });
  res.json(sample);
});

const updateSampleProfile = asyncHandler(async (req, res) => {
  const project = await Sample.findById(req.params.id);
  if (project) {
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

export { addSample, getMySamples, getAllSamples, updateSampleProfile };
