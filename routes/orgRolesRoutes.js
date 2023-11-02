import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addNewOrgRole,
  getMyOrgRoles,
} from "../controllers/orgRolesController.js";
const router = express.Router();

router.route("/:id").get(getMyOrgRoles);
router.route("/").post(protect, addNewOrgRole);
export default router;
