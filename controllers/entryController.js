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

export { getEntriesById, addNewEntry, getMyEntries };
