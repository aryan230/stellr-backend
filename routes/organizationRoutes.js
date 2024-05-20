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
  addOrgLogs,
  getCollabOrganizations,
  getMyDataOrganizations,
  getMyOrganizations,
  joinAnOrg,
  removeCollabratorOrg,
  updateCollabRoleOrg,
  updateCollabStatusOrg,
  updateOrganizationProfile,
} from "../controllers/organizationController.js";
const router = express.Router();
router.route("/myorgs").get(protect, getMyOrganizations);
router
  .route("/:id")
  .get(getProjectsById)
  .put(protect, updateOrganizationProfile);
router.route("/").post(protect, addNewOrganization);
router.route("/").get(protect, getAllProjects);
router
  .route("/collab")
  .post(protect, addCollabratorOrg)
  .delete(protect, removeCollabratorOrg);
router.route("/collab/:id").get(protect, getCollabOrganizations);
router.route("/join").post(protect, joinAnOrg);
router.route("/collab/update/status").post(protect, updateCollabStatusOrg);
router.route("/logs").post(addOrgLogs);
router.route("/collab/update").post(protect, updateCollabRoleOrg);
router.route("/orgData").post(getMyDataOrganizations);
export default router;
