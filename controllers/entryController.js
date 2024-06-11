import Entry from "../models/EntryModel.js";
import asyncHandler from "express-async-handler";

const addNewEntry = asyncHandler(async (req, res) => {
  const { name, data, projectId, type } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please provide a name.");
    return;
  } else {
    const entry = new Entry({
      project: projectId,
      data,
      name,
      type: type ? type : "Lab Notebook",
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

const updateVersionControlNew = asyncHandler(async (req, res) => {
  const { entryId, logDetails } = req.body;
  const entry = await Entry.findById(entryId);
  if (entry) {
    const ms2 = new Date(entry.updatedAt).getTime();
    const ms1 = new Date().getTime();
    console.log(ms1 - ms2);
    // let newLogs = entry.versionControlNew;
    // newLogs.push(logDetails);
    // entry.versionControlNew = newLogs;
    // const updatedEntry = await entry.save();
    // res.json(updatedEntry);
  } else {
    throw new Error("No entry with id");
  }
});

const updateEntryProfile = asyncHandler(async (req, res) => {
  console.log(req.body);
  const project = await Entry.findById(req.params.id);
  if (project) {
    (project.name = req.body.name || project.name),
      (project.submittedForApproval =
        req.body.submittedForApproval || project.submittedForApproval),
      (project.isEdit = req.body.isEdit || project.isEdit),
      (project.authorSubmitted =
        req.body.authorSubmitted || project.authorSubmitted);
    const updatedProject = await project.save();
    res.json({
      _id: updatedProject._id,
      name: updatedProject.name,
      submittedForApproval: updatedProject.submittedForApproval,
    });
  } else {
    res.status(404);
    throw new Error("No Entry Found");
  }
});

const updateEntryStatus = asyncHandler(async (req, res) => {
  const project = await Entry.findById(req.params.id);
  console.log(req.body);
  if (project) {
    project.status = req.body.status || project.status;
    project.isEdit = req.body.isEdit;
    project.submittedForApproval = req.body.submittedForApproval;
    project.statusBy = req.body.userName;
    project.statusMessage = req.body.statusMessage;
    project.eSign = req.body.eSign;
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
  const id = req.params.id;
  const template = await Entry.findById(id);
  template.deleted = true;
  const newTemplate = template.save();
  res.json(newTemplate);
});

const updateEntryShare = asyncHandler(async (req, res) => {
  const project = await Entry.findById(req.params.id);
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
  getEntriesById,
  addNewEntry,
  getMyEntries,
  addEntryLogs,
  updateEntryProfile,
  addVersionControl,
  deleteEntry,
  converUpdateEntry,
  updateEntryStatus,
  updateEntryShare,
  updateVersionControlNew,
};
