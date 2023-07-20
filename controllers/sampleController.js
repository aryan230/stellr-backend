import asyncHandler from "express-async-handler";
import Sample from "../models/sampleModel.js";

const addSample = asyncHandler(async (req, res) => {
  const { projectId, type, data, assigned } = req.body;
  const sample = await Sample.create({
    project: projectId,
    user: req.user._id,
    type,
    data,
    assigned,
  });
  if (sample) {
    res.status(201);
    res.json({
      _id: sample._id,
      project: sample.project,
      type: sample.type,
      data: sample.data,
      assigned: sample.assigned,
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
  const sample = await Sample.find({ project: projectId });
  res.json(sample);
});

export { addSample, getMySamples, getAllSamples };
