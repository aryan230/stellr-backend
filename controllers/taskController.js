import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";
const addTask = asyncHandler(async (req, res) => {
  const { projectId, subject, due_date, priority, status, assigned } = req.body;
  const task = await Task.create({
    project: projectId,
    user: req.user._id,
    subject,
    due_date,
    priority,
    status,
    assigned,
  });
  if (task) {
    res.status(201);
    res.json({
      _id: task._id,
      project: task.project,
      subject: task.name,
      due_date: task.due_date,
      priority: task.priority,
      status: task.status,
      assigned: task.assigned,
    });
  } else {
    res.status();
    throw new Error("Invalid Data");
  }
});

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

const getMyTasks = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const tasks = await Task.find({ project: projectId });
  res.json(tasks);
});

const getMyTasksPersonal = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

const getCollabTasks = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const tasks = await Task.find({
    "assigned.user": req.user._id,
  });
  res.json(tasks);
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    (task.subject = req.body.subject || task.subject),
      (task.priority = req.body.priority || task.priority),
      (task.status = req.body.status || task.status),
      (task.due_date = req.body.due_date || task.due_date);
    const updatedTask = await task.save();
    res.json({
      _id: updatedTask._id,
      subject: updatedTask.subject,
      priority: updatedTask.priority,
      status: updatedTask.status,
    });
  } else {
    res.status(404);
    throw new Error("No Project Found");
  }
});

const addTaskLogs = asyncHandler(async (req, res) => {
  const { entryId, logDetails } = req.body;
  const entry = await Task.findById(entryId);
  if (entry) {
    let newLogs = entry.logs;
    newLogs.push(logDetails);
    entry.logs = newLogs;
    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } else {
    throw new Error(" No task with id");
  }
});

export {
  addTask,
  getMyTasks,
  getAllTasks,
  getMyTasksPersonal,
  getCollabTasks,
  updateTask,
  addTaskLogs,
};
