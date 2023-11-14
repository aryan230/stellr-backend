import asyncHandler from "express-async-handler";
import Sample from "../models/sampleModel.js";
import Notification from "../models/notificationModel.js";

const addNotification = asyncHandler(async (req, res) => {
  const { type, data, id } = req.body;
  const sample = await Notification.create({
    user: id,
    type,
    data,
  });
  if (sample) {
    res.status(201);
    res.json({
      _id: sample._id,
      type: sample.type,
      data: sample.data,
    });
  } else {
    res.status();
    throw new Error("Invalid Data");
  }
});

const getAllSamples = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const sample = await Sample.find({});
  res.json(sample);
});

const getMyNotifications = asyncHandler(async (req, res) => {
  const sample = await Notification.find({ user: req.user._id });
  res.json(sample);
});

// const updateSampleProfile = asyncHandler(async (req, res) => {
//   console.log(req.body);
//   const project = await Sample.findById(req.params.id);
//   if (project) {
//     let vc = project.versionControl;
//     vc.push({
//       data: JSON.stringify(project),
//       date: Date.now(),
//     });
//     project.versionControl = vc;
//     project.data = req.body.data || project.data;
//     const updatedProject = await project.save();
//     res.json({
//       _id: updatedProject._id,
//       data: updatedProject.data,
//     });
//   } else {
//     res.status(404);
//     throw new Error("No Sample Found");
//   }
// });

const updateNotificationToRead = asyncHandler(async (req, res) => {
  const final = await Notification.updateMany(
    { user: req.user._id },
    { $set: { read: true } }
  );

  console.log(final);
  // const sample = await Notification.find({ user: req.user._id });
  // const project = await Sample.findById(req.params.id);
  // const updatedSamples = await sample.map(({ read: read, ...rest }) => ({
  //   read: true,
  //   ...rest,
  // }));
  // console.log(updatedSa;mples)
});

export {
  addNotification,
  getMyNotifications,
  getAllSamples,
  updateNotificationToRead,
};
