import asyncHandler from "express-async-handler";
import Sample from "../models/sampleModel.js";
import Protocol from "../models/protocolModel.js";

const addProtocol = asyncHandler(async (req, res) => {
  const { title, objective, scope, procedure, materials, safety, results } =
    req.body;
  const protocols = await Protocol.find({ user: req.user._id });
  const protocol = await Protocol.create({
    user: req.user._id,
    title,
    objective,
    scope,
    procedure,
    materials,
    safety,
    results,
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

const getMyProtocols = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const sample = await Protocol.find({ user: req.user._id });
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

export { addProtocol, getMyProtocols, getAllProtocols, updateSampleProfile };
