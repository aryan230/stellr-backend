import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addNewDashboard,
  getMyDashboards,
  updateDashboardProfile,
} from "../controllers/dashboardController.js";
const router = express.Router();
router.route("/mydashboards").get(protect, getMyDashboards);
router.route("/").post(protect, addNewDashboard);
router.route("/:id").put(protect, updateDashboardProfile);
export default router;
