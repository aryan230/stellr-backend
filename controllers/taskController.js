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

export { addTask, getMyTasks, getAllTasks, getMyTasksPersonal, getCollabTasks };
