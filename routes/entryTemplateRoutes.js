import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addNewEntryTemplate,
  deleteTemplate,
  getMyTemplates,
} from "../controllers/entryTemplateController.js";

const router = express.Router();
router.route("/mytemplates").get(protect, getMyTemplates);
router.route("/").post(protect, addNewEntryTemplate);
router.route("/:id").delete(protect, deleteTemplate);
export default router;
