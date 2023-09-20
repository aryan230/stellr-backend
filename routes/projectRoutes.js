import express from "express";
import {
  addCollabrator,
  addNewProject,
  addOrganization,
  addProjectLogs,
  getAllProjects,
  getCollabProjects,
  getMyProjects,
  getMyProjectstats,
  getOrganizationProjects,
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
router.route("/org").post(protect, addOrganization);
router.route("/collab/update").post(protect, updateCollabRole);
router.route("/org/:id").get(protect, getOrganizationProjects);
router.route("/logs").post(addProjectLogs);
router.route("/stats").post(getMyProjectstats);
export default router;
