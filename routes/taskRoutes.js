import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addTask,
  getAllTasks,
  getMyTasks,
  getMyTasksPersonal,
} from "../controllers/taskController.js";
const router = express.Router();
router.route("/").post(protect, addTask).get(protect, getMyTasksPersonal);
router.route("/:id").get(protect, getMyTasks);
export default router;
