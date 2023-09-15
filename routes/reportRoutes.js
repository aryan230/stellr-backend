import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addNewReport, getMyReports } from "../controllers/reportController.js";
const router = express.Router();
router.route("/myreports").get(protect, getMyReports);
router.route("/").post(protect, addNewReport);
export default router;
