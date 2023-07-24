import EntryTemplate from "../models/entryTemplatesModel.js";
import asyncHandler from "express-async-handler";

const addNewEntryTemplate = asyncHandler(async (req, res) => {
  const { name, blocks, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please provide a name");
    return;
  } else {
    const template = new EntryTemplate({
      user: req.user._id,
      name,
      description,
      blocks,
    });

    const createdTemplate = await template.save();
    res.status(200);
    res.json(createdTemplate);
  }
});

const getMyTemplates = asyncHandler(async (req, res) => {
  const templates = await EntryTemplate.find({ user: req.user._id });
  res.json(templates);
});

export { addNewEntryTemplate, getMyTemplates };
