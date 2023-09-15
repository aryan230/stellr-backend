import asyncHandler from "express-async-handler";
import Report from "../models/reportModel.js";

const addNewReport = asyncHandler(async (req, res) => {
  const { name, description, dataSet, type } = req.body;

  if (!name && !description) {
    res.status(400);
    throw new Error("Please provide a name and description.");
    return;
  } else {
    const report = new Report({
      user: req.user._id,
      name,
      dataSet,
      type,
      description,
    });

    const createdReport = await report.save();
    res.status(200);
    res.json(createdReport);
  }
});

const getMyReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ user: req.user._id });
  res.json(reports);
});

export { addNewReport, getMyReports };
