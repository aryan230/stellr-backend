import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addSample,
  addSampleLogs,
  getAllSamples,
  getMySamples,
  updateSampleProfile,
} from "../controllers/sampleController.js";
import {
  addNotification,
  getMyNotifications,
  updateNotificationToRead,
} from "../controllers/notificationController.js";
const router = express.Router();

router.route("/").post(protect, addNotification).get(protect, getAllSamples);
router
  .route("/:id")
  .get(protect, getMyNotifications)
  .put(protect, updateNotificationToRead);
export default router;
