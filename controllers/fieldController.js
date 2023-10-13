import CustomField from "../models/CustomFeild.js";
import EntryTemplate from "../models/entryTemplatesModel.js";
import asyncHandler from "express-async-handler";

const addNewFieldTemplate = asyncHandler(async (req, res) => {
  const { name, description, data } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please provide a name");
    return;
  } else {
    const template = new CustomField({
      user: req.user._id,
      name,
      description,
      data,
    });

    const createdTemplate = await template.save();
    res.status(200);
    res.json(createdTemplate);
  }
});

const getMyFields = asyncHandler(async (req, res) => {
  const templates = await CustomField.find({ user: req.user._id });
  res.json(templates);
});

const deleteField = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const template = await CustomField.findById(id);
  template.deleted = true;
  const newTemplate = template.save();
  res.json(newTemplate);
});

export { addNewFieldTemplate, getMyFields, deleteField };
