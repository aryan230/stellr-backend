import asyncHandler from "express-async-handler";
import Sample from "../models/sampleModel.js";
import Protocol from "../models/protocolModel.js";
import SOP from "../models/sopModel.js";

const addSop = asyncHandler(async (req, res) => {
  const { title, data } = req.body;
  const protocols = await SOP.find({ user: req.user._id });
  const protocol = await SOP.create({
    user: req.user._id,

    title,
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

export { addSop, getMySops, getAllSops, updateSampleProfile };
