import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addTask,
  addTaskLogs,
  getAllTasks,
  getCollabTasks,
  getMyTasks,
  getMyTasksPersonal,
  updateTask,
} from "../controllers/taskController.js";
const router = express.Router();
router.route("/").post(protect, addTask).get(protect, getMyTasksPersonal);
router.route("/:id").get(protect, getMyTasks).put(protect, updateTask);
router.route("/all").get(getAllTasks);
router.route("/logs").post(addTaskLogs);
router.route("/collab/:id").get(protect, getCollabTasks);
export default router;
