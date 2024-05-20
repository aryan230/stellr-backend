import Entry from "../models/EntryModel.js";
import asyncHandler from "express-async-handler";
import ChemicalDrawing from "../models/chemicalDrawingModel.js";

const addNewCD = asyncHandler(async (req, res) => {
  const { name, data, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please provide a name.");
    return;
  } else {
    const entry = new ChemicalDrawing({
      user: req.user._id,
      data,
      name,
      description,
    });

    const createEntry = await entry.save();
    res.status(200);
    res.json(createEntry);
  }
});

const getCDById = asyncHandler(async (req, res) => {
  const entry = await ChemicalDrawing.findById(req.params.id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404);
    throw new Error("Entry not Found");
  }
});

const getMyCDs = asyncHandler(async (req, res) => {
  const entries = await ChemicalDrawing.find({ user: req.user._id });
  res.json(entries);
});

const addEntryLogs = asyncHandler(async (req, res) => {
  const { entryId, logDetails } = req.body;
  const entry = await Entry.findById(entryId);
  if (entry) {
    let newLogs = entry.logs;
    newLogs.push(logDetails);
    entry.logs = newLogs;
    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } else {
    throw new Error(" No entry with id");
  }
});

const addVersionControl = asyncHandler(async (req, res) => {
  const { entryId, logDetails } = req.body;
  const entry = await Entry.findById(entryId);
  if (entry) {
    let newLogs = entry.versionControl;
    newLogs.push(logDetails);
    entry.versionControl = newLogs;
    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } else {
    throw new Error("No entry with id");
  }
});

const updateCDData = asyncHandler(async (req, res) => {
  const project = await ChemicalDrawing.findById(req.params.id);
  if (project) {
    project.data = req.body.data || project.data;
    const updatedProject = await project.save();
    res.json({
      _id: updatedProject._id,
      name: updatedProject.name,
    });
  } else {
    res.status(404);
    throw new Error("No Entry Found");
  }
});

const converUpdateEntry = asyncHandler(async (req, res) => {
  const project = await Entry.findById(req.params.id);
  if (project) {
    project.data = req.body.data || project.data;
    project.converted = true;
    const updatedProject = await project.save();
    res.json({
      _id: updatedProject._id,
      data: updatedProject.data,
    });
  } else {
    res.status(404);
    throw new Error("No Entry Found");
  }
});

const deleteEntry = asyncHandler(async (req, res) => {
  const order = await Entry.findById(req.params.id);
  if (order) {
    await order.remove();
    res.json({ message: "Entry deleted sucessfully" });
  } else {
    res.status(404);
    throw new Error("Entry not found");
  }
});

const updateCDShare = asyncHandler(async (req, res) => {
  const project = await ChemicalDrawing.findById(req.params.id);
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
  getCDById,
  addNewCD,
  getMyCDs,
  addEntryLogs,
  updateCDData,
  addVersionControl,
  deleteEntry,
  converUpdateEntry,
  updateCDShare,
};
