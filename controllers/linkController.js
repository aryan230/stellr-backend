import asyncHandler from "express-async-handler";
import Link from "../models/linkModel.js";

const addLink = asyncHandler(async (req, res) => {
  const { data, expiry } = req.body;
  const newlink = await Link.create({
    user: req.user._id,
    data,
    expiry,
  });
  if (newlink) {
    res.status(201);
    res.json(newlink);
  } else {
    res.status();
    throw new Error("Invalid Data");
  }
});

const removeLink = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const template = await Link.findById(id);
  if (template) {
    await template.remove();
    res.json({ message: "Link deleted sucessfully" });
  } else {
    res.status(404);
    throw new Error("Link not found");
  }
});

const getLinkById = asyncHandler(async (req, res) => {
  const sample = await Link.findById(req.params.id);
  res.json(sample);
});

export { addLink, removeLink, getLinkById };
