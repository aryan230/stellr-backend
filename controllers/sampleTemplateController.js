import CustomField from "../models/CustomFeild.js";
import EntryTemplate from "../models/entryTemplatesModel.js";
import asyncHandler from "express-async-handler";
import SampleTemplate from "../models/sampleTemplateModal.js";

const addNewSampleTemplate = asyncHandler(async (req, res) => {
  const { name, description, type, data } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please provide a name");
    return;
  } else {
    const template = new SampleTemplate({
      user: req.user._id,
      name,
      type,
      description,
      data,
    });

    const createdTemplate = await template.save();
    res.status(200);
    res.json(createdTemplate);
  }
});

const getMySampleTemplate = asyncHandler(async (req, res) => {
  const templates = await SampleTemplate.find({ user: req.user._id });
  res.json(templates);
});

const deleteSampleTemplate = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const template = await SampleTemplate.findById(id);
  template.deleted = true;
  const newTemplate = template.save();
  res.json(newTemplate);
});

export { addNewSampleTemplate, getMySampleTemplate, deleteSampleTemplate };
