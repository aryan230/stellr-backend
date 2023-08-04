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
import {
  addCollabratorOrg,
  addNewOrganization,
  getCollabOrganizations,
  getMyOrganizations,
  removeCollabratorOrg,
  updateCollabRoleOrg,
} from "../controllers/organizationController.js";
const router = express.Router();
router.route("/myorgs").get(protect, getMyOrganizations);
router.route("/:id").get(getProjectsById).put(protect, updateProjectProfile);
router.route("/").post(protect, addNewOrganization);
router.route("/").get(protect, getAllProjects);
router
  .route("/collab")
  .post(protect, addCollabratorOrg)
  .delete(protect, removeCollabratorOrg);
router.route("/collab/:id").get(protect, getCollabOrganizations);
router.route("/collab/update").post(protect, updateCollabRoleOrg);
export default router;
