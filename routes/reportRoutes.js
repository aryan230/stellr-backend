import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addNewReport,
  getMyReports,
  getReportById,
  updateReportShare,
} from "../controllers/reportController.js";
const router = express.Router();
router.route("/myreports").get(protect, getMyReports);
router.route("/").post(protect, addNewReport);
router
  .route("/share/:id")
  .get(protect, getReportById)
  .put(protect, updateReportShare);
export default router;
