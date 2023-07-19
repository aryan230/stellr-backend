import express from "express";
import {
  addCollabrator,
  addNewProject,
  getAllProjects,
  getCollabProjects,
  getMyProjects,
  getProjectsById,
  removeCollabrator,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/myprojects").get(protect, getMyProjects);
router.route("/:id").get(getProjectsById);
router.route("/").post(protect, addNewProject);
router.route("/").get(protect, getAllProjects);
router
  .route("/collab")
  .post(protect, addCollabrator)
  .delete(protect, removeCollabrator);
router.route("/collab/:id").get(protect, getCollabProjects);
export default router;
