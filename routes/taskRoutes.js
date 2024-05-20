import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addTask,
  addTaskLogs,
  deleteTask,
  getAllTasks,
  getCollabTasks,
  getMyTasks,
  getMyTasksPersonal,
  getTaskById,
  updateTask,
  updateTaskShare,
} from "../controllers/taskController.js";
const router = express.Router();
router.route("/").post(protect, addTask).get(protect, getMyTasksPersonal);
router.route("/:id").get(protect, getMyTasks).put(protect, updateTask);
router.route("/p/:id").delete(protect, deleteTask);
router.route("/all").get(getAllTasks);
router.route("/logs").post(addTaskLogs);
router.route("/collab/:id").get(protect, getCollabTasks);

router
  .route("/share/:id")
  .get(protect, getTaskById)
  .put(protect, updateTaskShare);
export default router;
