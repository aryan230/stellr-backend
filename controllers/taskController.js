import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import { client } from "../server.js";
import TemplateOne from "../templates/one.js";
const addTask = asyncHandler(async (req, res) => {
  const {
    projectId,
    subject,
    due_date,
    priority,
    status,
    assigned,
    description,
  } = req.body;
  const task = await Task.create({
    project: projectId,
    user: req.user._id,
    subject,
    description,
    due_date,
    priority,
    status,
    assigned,
  });
  if (assigned.length > 0) {
    assigned.forEach(async (u) => {
      const user = await User.findById(u.user);
      const messageData = {
        from: "no-reply <admin@getstellr.io>",
        to: user.email,
        subject: `You have been assigned a new Task`,
        html: `${TemplateOne(
          `You have been assigned a new Task ${subject}`,
          user.name,
          `Congratulations! You have been assigned a new task. As you dive into this task, your unique contributions will be greatly valued.`,
          `View Dashboard`,
          `https://app.getstellr.io/`,
          `© Stellr Tech Solutions Private Limited`
        )}`,
      };

      client.messages
        .create("getstellr.io", messageData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
  if (task) {
    res.status(201);
    res.json({
      _id: task._id,
      project: task.project,
      subject: task.name,
      due_date: task.due_date,
      description: task.description,
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
      (task.due_date = req.body.due_date || task.due_date),
      (task.description = req.body.description || task.description);
    const updatedTask = await task.save();
    res.json({
      _id: updatedTask._id,
      subject: updatedTask.subject,
      priority: updatedTask.priority,
      status: updatedTask.status,
      description: updatedTask.description,
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

const deleteTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const template = await Task.findById(id);
  template.deleted = true;
  const newTemplate = template.save();
  res.json(newTemplate);
});

const getTaskById = asyncHandler(async (req, res) => {
  const sample = await Task.findById(req.params.id);
  res.json(sample);
});

const updateTaskShare = asyncHandler(async (req, res) => {
  const project = await Task.findById(req.params.id);
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
  addTask,
  getMyTasks,
  getAllTasks,
  getMyTasksPersonal,
  getCollabTasks,
  updateTask,
  addTaskLogs,
  deleteTask,
  getTaskById,
  updateTaskShare,
};
