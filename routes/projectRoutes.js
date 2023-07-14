import express from "express";
import {
  addNewProject,
  getMyProjects,
  getProjectsById,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/myprojects").get(protect, getMyProjects);
router.route("/:id").get(getProjectsById);
router.route("/").post(protect, addNewProject);

export default router;
