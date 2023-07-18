import Entry from "../models/EntryModel.js";
import asyncHandler from "express-async-handler";

const addNewEntry = asyncHandler(async (req, res) => {
  const { name, block, projectID } = req.body;

  if (!name && !block) {
    res.status(400);
    throw new Error("Please provide a name.");
    return;
  } else {
    const project = new Entry({
      user: req.user._id,
      block,
      name,
    });

    const createdProject = await project.save();
    res.status(200);
    res.json(createdProject);
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
  const entries = await Entry.find({ user: req.user._id });
  res.json(entries);
});

export { getEntriesById, addNewEntry, getMyEntries };
