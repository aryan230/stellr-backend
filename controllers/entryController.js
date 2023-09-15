import Entry from "../models/EntryModel.js";
import asyncHandler from "express-async-handler";

const addNewEntry = asyncHandler(async (req, res) => {
  const { name, data, projectId } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please provide a name.");
    return;
  } else {
    const entry = new Entry({
      project: projectId,
      data,
      name,
    });

    const createEntry = await entry.save();
    res.status(200);
    res.json(createEntry);
  }
});

const getEntriesById = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404);
    throw new Error("Entry not Found");
  }
});

const getMyEntries = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const entries = await Entry.find({ project: projectId });
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

const updateEntryProfile = asyncHandler(async (req, res) => {
  const project = await Entry.findById(req.params.id);
  if (project) {
    project.name = req.body.name || project.name;
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

export {
  getEntriesById,
  addNewEntry,
  getMyEntries,
  addEntryLogs,
  updateEntryProfile,
  addVersionControl,
};
