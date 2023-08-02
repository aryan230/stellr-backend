import express from "express";
import {
  addCollabrator,
  addNewProject,
  getAllProjects,
  getCollabProjects,
  getMyProjects,
  getProjectsById,
  removeCollabrator,
  updateCollabRole,
  updateProjectProfile,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/myprojects").get(protect, getMyProjects);
router.route("/:id").get(getProjectsById).put(protect, updateProjectProfile);
router.route("/").post(protect, addNewProject);
router.route("/").get(protect, getAllProjects);
router
  .route("/collab")
  .post(protect, addCollabrator)
  .delete(protect, removeCollabrator);
router.route("/collab/:id").get(protect, getCollabProjects);
router.route("/collab/update").post(protect, updateCollabRole);
export default router;
