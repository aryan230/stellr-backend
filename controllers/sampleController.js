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

export { addSample, getMySamples, getAllSamples };
